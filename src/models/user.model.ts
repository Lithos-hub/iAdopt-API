import { Model, Schema, model } from 'mongoose';
import { User } from '@/interfaces';

const UserSchema = new Schema<User, Model<User>>(
  {
    email: {
      required: true,
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
      trim: true,
    },
    reports: {
      required: true,
      type: [Object],
    },
    generations: {
      required: true,
      type: [Object],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model('User', UserSchema);

export default UserModel;
