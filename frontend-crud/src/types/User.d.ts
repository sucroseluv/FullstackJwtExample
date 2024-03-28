export type UserInfo = {
  email: string;
};

export type UserInfoOptional = {
  name?: string;
  phone?: string;
  address?: string;
  info?: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
