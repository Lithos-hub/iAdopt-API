import { Request, Response } from 'express';

import { ErrorHandle } from '@/utils';
import {
  deleteGeneration,
  getGenerations,
  postGeneration,
  updateGeneration,
} from '@/services';

export const handleGetGenerations = async (
  { params }: Request,
  res: Response
) => {
  try {
    const { id } = params;
    const response = await getGenerations(id);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_GET_GENERATIONS', 500);
  }
};

export const handlePostGeneration = async (
  { body }: Request,
  res: Response
) => {
  try {
    const response = await postGeneration(body);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_GENERATIONS', 500);
  }
};

export const handleUpdateGeneration = async (
  { params, body }: Request,
  res: Response
) => {
  try {
    const { _id } = params;
    const response = await updateGeneration(_id, body);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_POST_GENERATIONS', 500);
  }
};

export const handleDeleteGeneration = async (
  { params }: Request,
  res: Response
) => {
  try {
    const { _id } = params;
    const response = await deleteGeneration(_id);
    res.send(response);
  } catch (error) {
    ErrorHandle(res, 'ERROR_DELETE_GENERATIONS', 500);
  }
};
