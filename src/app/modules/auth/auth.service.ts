import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IAuthLoginResponse, ILoginUser } from './auth.interface';
import { jwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';

const loginUser = async (payload: ILoginUser): Promise<IAuthLoginResponse> => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password as string))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
  }
  const { role, phoneNumber } = isUserExist;
  const tokenData = { role, phoneNumber };
  //   create access token
  const createAccessToken = jwtHelper.createToken(
    tokenData,
    config.access_token_secret as string,
    config.access_token_expirein as string,
  );

  //   create Refersh Token
  const createRefreshToken = jwtHelper.createToken(
    tokenData,
    config.refresh_token_secret as string,
    config.refresh_token_expirein as string,
  );

  const loginUserResponse = {
    accessToken: createAccessToken,
    refreshToken: createRefreshToken,
  };
  return loginUserResponse;
};

export const AuthService = {
  loginUser,
};
