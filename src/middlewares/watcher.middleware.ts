import { NextFunction, Response } from 'express';
import { ExtendedRequest } from '@/interfaces';

const watcher = (req: ExtendedRequest, _: Response, next: NextFunction) => {
  const METHOD = req.method;
  const URL = req.url;

  console.log(`METHOD: ${METHOD} - URL: ${URL}`);

  next();
};

export { watcher };
