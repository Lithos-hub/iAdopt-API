import { watcher } from '@/middlewares';
import { Router } from 'express';
import { readdirSync } from 'fs';

const cleanFileName = (fileName: string): string =>
  fileName.split('.').shift() as string;

const PATH_ROUTER = `${__dirname}`;
const router = Router();

readdirSync(PATH_ROUTER).forEach(async (filename) => {
  const cleanName = cleanFileName(filename);
  if (cleanName !== 'index') {
    await import(`./${cleanName}.routes`).then((moduleRouter) => {
      router.use(`/api/v1/${cleanName}`, watcher, moduleRouter.router);
    });
  }
});

export default router;
