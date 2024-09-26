export type ILoginUser = {
  email: string;
  password: string;
};

export type IAuthLoginResponse = {
  accessToken: string;
  refreshToken?: string;
};
