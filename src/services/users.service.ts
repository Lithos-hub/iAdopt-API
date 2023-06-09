import { ObjectId } from 'mongodb';
import { User } from '@/interfaces';
import { UserModel } from '@/models';
import { encrypt, genToken } from '@/utils';

const checkUserAlreadyExists = async (_id: string) =>
  await UserModel.findOne({ _id });

const getUser = async (_id: ObjectId) => {
  const response = await UserModel.findById(_id);
  if (response === null) return 'NOT_FOUND';
  const { _id: userId, createdAt, email, reports, surveys } = response;
  return {
    _id: userId,
    createdAt,
    email,
    reports,
    surveys,
  };
};
const updateUser = async (id: string, data: User) => {
  const userAlreadyExists = await checkUserAlreadyExists(id);

  if (userAlreadyExists !== null) {
    const { _id } = userAlreadyExists;

    let encryptedPassword;
    const dataToSend = {
      ...data,
    };

    if (data.password !== null && data.password !== undefined) {
      encryptedPassword = await encrypt(data.password);
      dataToSend.password = encryptedPassword;
    }

    const update = await UserModel.findByIdAndUpdate(
      {
        _id,
      },
      dataToSend,
      {
        new: true,
      }
    );

    const { email, createdAt } = update as User;

    return {
      token: genToken(_id),
      user: {
        _id: id,
        email,
        createdAt,
      },
    };
  } else {
    return 'USER_NOT_FOUND';
  }
};
const deleteUser = async (id: string) => await UserModel.findByIdAndDelete(id);

export { getUser, updateUser, deleteUser };
