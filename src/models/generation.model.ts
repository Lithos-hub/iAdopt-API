import { Model, Schema, model } from 'mongoose';
import { Generation } from '@/interfaces';

const GenerationSchema = new Schema<Generation, Model<Generation>>(
  {
    link: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    is_favourite: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const GenerationModel = model('Generation', GenerationSchema);

export default GenerationModel;
