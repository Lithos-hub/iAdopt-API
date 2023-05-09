import multer, { diskStorage } from 'multer';
import { ExtendedRequest } from '../interfaces/request.interface';

const storage = diskStorage({
  destination({ user }: ExtendedRequest, __, cb) {
    const PATH_STORAGE = `${process.cwd()}/src/public/${user?._id as string}`;
    cb(null, PATH_STORAGE);
  },
  filename(_, file: Express.Multer.File, cb) {
    const ext = file.originalname.split('.').pop();
    const fileNameRandom = `image-${Date.now()}.${ext as string}`;
    cb(null, fileNameRandom);
  },
});

export const fileMiddleware = multer({ storage });
