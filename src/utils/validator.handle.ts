import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';

const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(403).send({ errors: error.array() });
  }
};

export default validate;
