import { Request, Response } from 'express';

import { ExtendedRequest, File } from '@/interfaces';
import { uploadFile, getFileByName } from '@/services';
import { ErrorHandle } from '@/utils';

const postFile = async ({ user, file }: ExtendedRequest, res: Response) => {
  try {
    const response: File = await uploadFile({
      fileName: String(file?.filename),
      idUser: String(user?._id),
      path: String(file?.path),
      mimeType: String(file?.mimetype),
      size: Number(file?.size),
    });
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_FILE', 500);
  }
};

const getFile = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params;
    const response = await getFileByName(id);
    res.send(response ?? 'NOT_FOUND');
  } catch (error) {
    ErrorHandle(res, 'ERROR_GET_FILE', 500);
  }
};
export { postFile, getFile };
