import { Report } from '@/interfaces';
import ReportModel from '@/models/survey.model';

export const getReports = async (userId: string) =>
  await ReportModel.find({ userId });

export const postReport = async (survey: Report) =>
  await ReportModel.create(survey);

export const updateReport = async (_id: string, survey: Report) =>
  await ReportModel.findOneAndUpdate({ _id }, survey);

export const deleteReport = async (_id: string) =>
  await ReportModel.findOneAndRemove({ _id });
