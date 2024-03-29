import { Request, Response, NextFunction } from 'express';

interface ErrorObj {
  type: string;
  message: string;
}

const ERRORS: { [index: string]: number } = {
  NotFoundCpfException: 404,
  ExistsCpfException: 409,
  InvalidCpfException: 422
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error: ErrorObj, req: Request, res: Response, next: NextFunction) {
  const type = error.type;
  let statusCode = ERRORS[type];
  if (!statusCode) {
    statusCode = 500;
  }
  return res.status(statusCode).send(error);
}

export { errorHandler };
