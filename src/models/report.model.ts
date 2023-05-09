import { Model, Schema, model } from 'mongoose';
import { Report } from '@/interfaces';

const ReportSchema = new Schema<Report, Model<Report>>(
  {
    title: {
      required: true,
      type: String,
    },
    evaluation_score: {
      required: true,
      type: Number,
    },
    evaluation_results: {
      required: true,
      type: String,
    },
    specie: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    adopter_name: {
      required: true,
      type: String,
    },
    adopter_age: {
      required: true,
      type: Number,
    },
    is_favourite: {
      required: true,
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ReportModel = model('Report', ReportSchema);

export default ReportModel;
