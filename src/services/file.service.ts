import { File } from '@/interfaces';
import { FileModel } from '@/models';

const uploadFile = async ({ fileName, idUser, path, mimeType, size }: File) => {
  return await FileModel.create({ fileName, idUser, path, mimeType, size });
};

const getFileByName = async (name: string) =>
  await FileModel.findOne({ fileName: name });

export { uploadFile, getFileByName };
