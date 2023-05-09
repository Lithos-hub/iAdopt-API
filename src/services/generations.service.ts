import type { Generation } from '@/interfaces';
import GenerationModel from '@/models/generation.model';

export const getGenerations = async (userId: string) =>
  await GenerationModel.find({ userId });

export const postGeneration = async (generation: Generation) =>
  await GenerationModel.create(generation);

export const updateGeneration = async (_id: string, generation: Generation) =>
  await GenerationModel.findOneAndUpdate({ _id }, generation);

export const deleteGeneration = async (_id: string) =>
  await GenerationModel.findOneAndRemove({ _id });
