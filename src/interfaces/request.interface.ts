import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export interface ExtendedRequest extends Request {
  user?: JwtPayload | { _id: ObjectId };
}
