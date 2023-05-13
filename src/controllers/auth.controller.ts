import { Request, Response } from 'express';
import fs from 'fs';

import { getUser, registerUser, loginUser } from '@/services';
import { ErrorHandle, genToken } from '@/utils';
import { ExtendedRequest } from '@/interfaces';

const signUp = async ({ body }: Request, res: Response) => {
  const response = await registerUser(body);

  if (response === 'USER_ALREADY_EXISTS') {
    ErrorHandle(res, 'BACKEND_ERROR.REGISTER.USER_ALREADY_EXISTS', 401);
  } else {
    const { _id } = response.user;
    const dir = `${process.cwd()}/public/${String(_id)}`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    res.send(response);
  }
};

const signIn = async ({ body }: Request, res: Response) => {
  const response = await loginUser(body);
  if (response === 'INCORRECT_DATA') {
    ErrorHandle(res, 'BACKEND_ERROR.LOGIN.INCORRECT_DATA', 401);
  } else {
    res.send(response);
  }
};

const getSession = async ({ user }: ExtendedRequest, res: Response) => {
  const response = await getUser(user?._id);
  if (response === 'NOT_FOUND') {
    ErrorHandle(res, 'BACKEND_ERROR.SESSION.NOT_FOUND', 401);
  } else {
    res.send({
      user: response,
      token: genToken(user?._id),
    });
  }
};

export { signUp, signIn, getSession };
