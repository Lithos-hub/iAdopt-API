import { Router } from 'express';
import { checkJwt } from '@/middlewares';
import {
  handleGetReports,
  handlePostReport,
  handleUpdateReport,
  handleDeleteReport,
} from '@/controllers';

const router = Router();

router.get('/:id', checkJwt, handleGetReports);
router.post('/', checkJwt, handlePostReport);
router.put('/:id', checkJwt, handleUpdateReport);
router.delete('/:id', checkJwt, handleDeleteReport);

export { router };
