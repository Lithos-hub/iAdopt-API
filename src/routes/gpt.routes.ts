import { handlePostGPT } from '@/controllers';
import { checkJwt } from '@/middlewares';
import { Router } from 'express';

const router = Router();

router.post('/', checkJwt, handlePostGPT);

export { router };
