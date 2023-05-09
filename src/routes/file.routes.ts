import { Router } from 'express';

import { postFile, getFile } from '@/controllers';
import { fileMiddleware, checkJwt } from '@/middlewares';

const router = Router();

router.post('/', checkJwt, fileMiddleware.single('file'), postFile);
router.get('/:id', checkJwt, getFile);

export { router };
