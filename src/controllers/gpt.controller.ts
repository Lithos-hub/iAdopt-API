import { ExtendedRequest } from '@/interfaces';
import { postGPT } from '@/services';
import { ErrorHandle } from '@/utils';
import { Response } from 'express';

export const handlePostGPT = async (
  { user, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const response = await postGPT({
      userId: user?._id,
      formData: body,
    });
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_SURVEYS', 500);
  }
};
