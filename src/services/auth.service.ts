import { Auth, User } from '@/interfaces';
import { UserModel } from '@/models';

import { encrypt, verified, genToken } from '@/utils';

export const checkUserAlreadyExists = async (email: string) =>
  await UserModel.findOne({ email });

export const registerUser = async ({ email, password }: User) => {
  const userAlreadyExists = await checkUserAlreadyExists(email);
  if (userAlreadyExists !== null) return 'USER_ALREADY_EXISTS';

  const encryptedPass: string = await encrypt(password);

  const { _id, createdAt } = await UserModel.create({
    email,
    password: encryptedPass,
  });

  return {
    token: genToken(_id),
    user: {
      _id,
      email,
      createdAt,
    },
  };
};

export const loginUser = async ({ email, password }: Auth) => {
  const userAlreadyExists = await checkUserAlreadyExists(email);
  const encryptedPass = userAlreadyExists?.password ?? '';
  const isCorrect =
    (await verified(password, encryptedPass)) && userAlreadyExists;
  if (isCorrect === false) {
    return 'INCORRECT_DATA';
  } else {
    const { _id, email, createdAt } = userAlreadyExists as User;
    return {
      token: genToken(_id),
      user: {
        _id,
        email,
        createdAt,
      },
    };
  }
};
