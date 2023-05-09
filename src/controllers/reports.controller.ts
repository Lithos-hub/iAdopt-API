import type { Request, Response } from 'express';

import { ErrorHandle } from '@/utils';
import { deleteReport, getReports, postReport, updateReport } from '@/services';

export const handleGetReports = async (
  { params }: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = params;
    const response = await getReports(id);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_GET_GENERATIONS', 500);
  }
};

export const handlePostReport = async (
  { body }: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await postReport(body);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_GENERATIONS', 500);
  }
};

export const handleUpdateReport = async (
  { params, body }: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = params;
    const response = await updateReport(_id, body);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_GENERATIONS', 500);
  }
};

export const handleDeleteReport = async (
  { params }: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = params;
    const response = await deleteReport(_id);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_DELETE_GENERATIONS', 500);
  }
};
