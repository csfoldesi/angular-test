import { User } from './user';

export type Post = {
  id: number;
  userId: User['id'];
  title: string;
  body: string;
};
