import { Router } from 'express';
import { checkJwt } from '@/middlewares';
import {
  handleGetReports,
  handlePostReport,
  handleUpdateReport,
  handleDeleteReport,
} from '@/controllers';

const router = Router();

router.get('/reports/:id', checkJwt, handleGetReports);
router.post('/reports', checkJwt, handlePostReport);
router.put('/reports/:id', checkJwt, handleUpdateReport);
router.delete('/reports/:id', checkJwt, handleDeleteReport);

export { router };
