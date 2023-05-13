import { AdopterSurvey } from '@/interfaces';
import SurveyModel from '@/models/survey.model';

const getAdopterSurvey = async (link: string) =>
  await SurveyModel.findOne({ link }).lean();

const createAdopterSurvey = async (data: AdopterSurvey) =>
  await SurveyModel.create(data);

const updateAdopterSurvey = async ({ link, questions }: AdopterSurvey) =>
  await SurveyModel.findOneAndUpdate({ link }, questions, { new: true });

export { getAdopterSurvey, createAdopterSurvey, updateAdopterSurvey };
