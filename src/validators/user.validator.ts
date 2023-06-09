import { check } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

import { ValidatorHandle } from '@/utils';

export const validateSignUp = [
  check('email').exists().trim().notEmpty().isEmail(),
  check('password')
    .exists()
    .trim()
    .notEmpty()
    .isLength({ min: 8 })
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/),
  (req: Request, res: Response, next: NextFunction) => {
    ValidatorHandle(req, res, next);
  },
];

export const validateSignin = [
  check('email').exists().trim().notEmpty().isEmail(),
  check('password').exists().trim().notEmpty().isLength({ min: 8 }),
  (req: Request, res: Response, next: NextFunction) => {
    ValidatorHandle(req, res, next);
  },
];
