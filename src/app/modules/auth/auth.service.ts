import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { IAuthLoginResponse, ILoginUser } from './auth.interface';
import { jwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

// Login user by Email and password
const loginUser = async (payload: ILoginUser): Promise<IAuthLoginResponse> => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExist(email);
  //   checking user
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //   checking password
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

// get AaccessToken By RefreshToken
const getAccessTokenByRefreshToken = async (
  refreshtoken: string,
): Promise<IAuthLoginResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      refreshtoken,
      config.refresh_token_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh Token');
  }
  const { phoneNumber } = verifiedToken;

  const isUserExist = await User.findOne({ phoneNumber: phoneNumber });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User doest not exist');
  }

  const { phoneNumber: userPhoneNumber, role } = isUserExist;
  const tokenData = { userPhoneNumber, role };
  //   creat New AccessToken
  const createNewAccessToken = jwtHelper.createToken(
    tokenData,
    config.access_token_secret as Secret,
    config.access_token_expirein as string,
  );

  const loginUserResponse = {
    accessToken: createNewAccessToken,
  };
  return loginUserResponse;
};

export const AuthService = {
  loginUser,
  getAccessTokenByRefreshToken,
};
