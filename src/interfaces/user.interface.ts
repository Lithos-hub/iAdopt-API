import { ObjectId } from 'mongoose';
import { Auth } from './auth.interface';

export interface User extends Auth {
  createdAt?: string;
  reports: [];
  generations: [];
}

export interface LoginUser {
  _id: ObjectId;
  email: string;
}

export interface UserPlusToken {
  token: string;
  user: LoginUser;
}
