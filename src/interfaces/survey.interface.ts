import { ObjectId } from 'mongodb';

export interface SurveyFromDB extends Survey {
  _id: ObjectId;
}

export interface AdopterSurvey {
  link: string;
  questions: string[];
}

export interface Survey {
  userId: string;
  title: string;
  link: string;
  is_favourite: boolean;
  questions: string[];
  adopter_info?: {
    name: string;
    age: number | null;
    email: string;
    phone?: string;
    region: string;
    city: string;
  };
  animal_info?: {
    specie: string;
    name: string;
    region: string;
    breed: string;
    age: string;
    image?: File | null;
    link?: string | null;
  };
}
