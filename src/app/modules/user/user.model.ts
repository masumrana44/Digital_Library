import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const UserSchema = new Schema<IUser, UserModel>({
  name: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    required: true,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hasing plaintext before save password
UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  this.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

// set role when user does not give role in body
UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.role) {
    this.role = 'normalUser';
  }
  next();
});

// compre password by bcrypt
UserSchema.statics.isPasswordMatch = async function (
  inputPassword: string,
  savedPassword: string,
): Promise<boolean | null> {
  return await bcrypt.compare(inputPassword, savedPassword);
};

// checking is User exist
UserSchema.statics.isUserExist = async function (email) {
  return await User.findOne({ email: email });
};

export const User = model<IUser, UserModel>('User', UserSchema);
