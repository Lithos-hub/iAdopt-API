import { Report } from '@/interfaces';
import ReportModel from '@/models/generation.model';

export const getReports = async (userId: string) =>
  await ReportModel.find({ userId });

export const postReport = async (generation: Report) =>
  await ReportModel.create(generation);

export const updateReport = async (_id: string, generation: Report) =>
  await ReportModel.findOneAndUpdate({ _id }, generation);

export const deleteReport = async (_id: string) =>
  await ReportModel.findOneAndRemove({ _id });
