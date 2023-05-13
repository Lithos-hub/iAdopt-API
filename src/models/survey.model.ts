import { Model, Schema, model } from 'mongoose';
import { AdopterSurvey } from '@/interfaces';

const SurveySchema = new Schema<AdopterSurvey, Model<AdopterSurvey>>(
  {
    link: {
      type: String,
      required: true,
    },
    questions: {
      type: [String],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const SurveyModel = model('Survey', SurveySchema);

export default SurveyModel;
