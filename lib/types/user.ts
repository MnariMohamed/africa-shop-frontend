export interface IUser {
  id?: any;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  role?: string;
  status?: { id: number; name: string };
  createdAt?: string;
}

export interface IUserInfo {
  user: IUser | null;
  token?: string;
  tokenExpiresIn?: number;
}

//RootState interface=> used for state type in useSelector hook

export interface IUserInfoRootState {
  userInfo: IUserInfo;
}
