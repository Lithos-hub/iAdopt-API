import { NextFunction, Response } from 'express';
import { ExtendedRequest } from '@/interfaces';
import { ErrorHandle, verifyToken } from '@/utils';

const checkJwt = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-token'];

    if (token === undefined) {
      ErrorHandle(res, 'NOT_TOKEN', 401);
      return;
    }
    const dataToken = verifyToken(String(token)) as { _id: string };
    if (dataToken._id === undefined) {
      ErrorHandle(res, 'ERROR_ID_TOKEN', 401);
      return;
    }

    req.user = dataToken;
    next();
  } catch (error) {
    ErrorHandle(res, 'INVALID_SESSION_JWT', 401);
  }
};

export { checkJwt };
