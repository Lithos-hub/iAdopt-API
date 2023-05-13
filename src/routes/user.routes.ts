import { handleGetUser } from '@/controllers/user.controller';
import { checkJwt } from '@/middlewares';
import { Router } from 'express';

const router = Router();

router.get('/', checkJwt, handleGetUser);

export { router };
