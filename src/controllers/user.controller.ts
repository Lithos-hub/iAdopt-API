import { ExtendedRequest } from '@/interfaces';
import { getUser } from '@/services';
import { ErrorHandle, genToken } from '@/utils';
import { Response } from 'express';

export const handleGetUser = async (
  { user }: ExtendedRequest,
  res: Response
) => {
  const response = await getUser(user?._id);
  if (response === 'NOT_FOUND') {
    ErrorHandle(res, 'BACKEND_ERROR.USER_NOT_EXISTS', 404);
  } else {
    res.send({
      user: {
        ...response,
        token: genToken(user?._id),
      },
    });
  }
};
