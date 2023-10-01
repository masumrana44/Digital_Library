type IName = {
  firstName: string;
  lastName?: string;
};

export type IUser = {
  name: IName;
  email: string;
  phoneNumber: number;
  password: string;
};
