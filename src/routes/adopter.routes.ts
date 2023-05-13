import {
  handleCreateAdopterSurvey,
  handleGetAdopterSurvey,
} from '@/controllers';
import { Router } from 'express';

const router = Router();

router.get('/:id', handleGetAdopterSurvey);
router.post('/', handleCreateAdopterSurvey);

export { router };
