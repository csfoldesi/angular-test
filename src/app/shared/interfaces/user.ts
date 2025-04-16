export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
