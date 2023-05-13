import { Router } from 'express';
import { checkJwt } from '@/middlewares';
import {
  handleCreateSurvey,
  handleUpdateSurvey,
  handleDeleteSurvey,
  handleGetSurveyById,
} from '@/controllers';

const router = Router();

router.get('/:id', checkJwt, handleGetSurveyById);
router.post('/', checkJwt, handleCreateSurvey);
router.patch('/:id', checkJwt, handleUpdateSurvey);
router.delete('/:id', checkJwt, handleDeleteSurvey);

export { router };
