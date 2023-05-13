import { createAdopterSurvey, getAdopterSurvey } from '@/services';
import { ErrorHandle } from '@/utils';
import { Request, Response } from 'express';

export const handleCreateAdopterSurvey = async (
  { body }: Request,
  res: Response
) => {
  try {
    const response = await createAdopterSurvey(body);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_ADOPTER_SURVEY', 500);
  }
};

export const handleGetAdopterSurvey = async (
  { params }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const response = await getAdopterSurvey(id);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_GET_ADOPTER_SURVEY', 500);
  }
};
