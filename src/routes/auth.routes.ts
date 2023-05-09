import { Router } from 'express';

import { signUp, signIn, getSession } from '@/controllers';
import { checkJwt } from '@/middlewares';
import { validateSignUp, validateSignin } from '@/validators';

const router = Router();

router.post('/join', validateSignUp, signUp);
router.post('/login', validateSignin, signIn);
router.get('/session', checkJwt, getSession);

export { router };
