import { ObjectId } from 'mongodb';
import { Survey } from '@/interfaces';
import { UserModel } from '@/models';

const getSurveys = async (userId: string) => {
  return await UserModel.findOne({
    _id: userId,
  });
};

const getSurveyDetails = async ({
  userId,
  id,
}: {
  userId: string;
  id: number;
}): Promise<Survey | null> => {
  return await UserModel.findOne({
    _id: userId,
    'surveys.id': id,
  });
};

const getSurbeyByLink = async (link: string) => {
  return await UserModel.findOne({
    'surveys.link': link,
  });
};

const createSurvey = async (_id: ObjectId, data: Survey) => {
  const surveysList = await UserModel.findOne({ _id }).select('surveys').lean();
  let surveysLength = 0;

  if (surveysList !== null) {
    surveysLength = surveysList.surveys.length + 1;
  }

  return await UserModel.findOneAndUpdate(
    {
      _id,
    },
    {
      $push: {
        surveys: {
          ...data,
          title: `Formulario - ${surveysLength}`,
          createdAt: new Date(),
          id: new Date().getTime(),
        },
      },
    },
    {
      new: true,
    }
  );
};

const updateSurvey = async ({
  userId,
  id,
  data,
}: {
  userId: string;
  id: number;
  data: Survey;
}) => {
  const surveyAlreadyExists = await UserModel.findOne({
    _id: userId,
    'surveys.id': id,
  });

  if (surveyAlreadyExists !== null) {
    const { _id } = surveyAlreadyExists;

    return await UserModel.findOneAndUpdate(
      {
        _id,
        'surveys.id': id,
      },
      {
        $set: {
          'surveys.$.title': data.title,
          'surveys.$.questions': data.questions,
          'surveys.$.is_favourite': data.is_favourite,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
  } else {
    return 'SURVEY_NOT_FOUND';
  }
};
const deleteSurvey = async ({ userId, id }: { userId: string; id: number }) => {
  return await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      $pull: {
        surveys: { id },
      },
    },
    {
      upsert: true,
      new: true,
    }
  );
};

export {
  getSurveys,
  createSurvey,
  getSurveyDetails,
  updateSurvey,
  deleteSurvey,
  getSurbeyByLink,
};
