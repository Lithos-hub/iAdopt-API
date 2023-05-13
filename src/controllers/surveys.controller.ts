import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ErrorHandle } from '@/utils';
import {
  getSurveyDetails,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  createAdopterSurvey,
  getSurbeyByLink,
  updateAdopterSurvey,
} from '@/services';
import { ExtendedRequest } from '@/interfaces';

export const handleGetSurveyById = async (
  { user, params }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const response = await getSurveyDetails({ userId, id: Number(id) });
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_GET_SURVEYS', 500);
  }
};

export const handleGetSurveyByLink = async (
  { params }: ExtendedRequest,
  res: Response
) => {
  try {
    const { link } = params;
    const response = await getSurbeyByLink(link);

    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_GET_SURVEYS', 500);
  }
};

export const handleCreateSurvey = async (
  { user, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const id = user?._id;

    const link = String(uuidv4());

    await createAdopterSurvey({ link, questions: body.questions });

    const response = await createSurvey(id, {
      userId: String(id),
      title: '',
      link,
      is_favourite: false,
      questions: body.questions,
      animal_info: body.animal_info,
      adopter_info: body.adopter_info,
    });
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_SURVEYS', 500);
  }
};

export const handleUpdateSurvey = async (
  { user, params, body }: ExtendedRequest,
  res: Response
) => {
  try {
    const { id } = params;

    // UPDATE IN SURVEYS COLLECTION

    const adopterResponse = await updateAdopterSurvey({
      link: body.link,
      questions: body.questions,
    });

    console.log('adopterResponse', adopterResponse);

    const response = await updateSurvey({
      userId: String(user?._id),
      id: Number(id),
      data: body,
    });
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_PATCH_SURVEYS', 500);
  }
};

export const handleDeleteSurvey = async (
  { user, params }: ExtendedRequest,
  res: Response
) => {
  try {
    const userId = user?._id;
    const { id } = params;
    const response = await deleteSurvey({ userId, id: Number(id) });
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_DELETE_SURVEYS', 500);
  }
};
