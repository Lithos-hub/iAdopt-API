import { Router } from 'express';
import { checkJwt } from '@/middlewares';
import {
  handleGetGenerations,
  handlePostGeneration,
  handleUpdateGeneration,
  handleDeleteGeneration,
} from '@/controllers';

const router = Router();

router.get('/generations/:id', checkJwt, handleGetGenerations);
router.post('/generations', checkJwt, handlePostGeneration);
router.put('/generations/:id', checkJwt, handleUpdateGeneration);
router.delete('/generations/:id', checkJwt, handleDeleteGeneration);

export { router };
