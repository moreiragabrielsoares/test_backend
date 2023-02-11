import { Request, Response, NextFunction } from 'express';
import { isCpfValid } from '../utils/cpfValidator';

function validateCpfParams(req: Partial<Request>, res: Partial<Response>, next: NextFunction) {
  const cpf = req.params?.['cpf'] as string;

  if (!isCpfValid(cpf)) {
    throw { type: 'InvalidCpfException', message: 'CPF is not valid.' };
  }

  next();
}

function validateCpfBody(req: Partial<Request>, res: Partial<Response>, next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const cpf = req.body?.['cpf'] as string;

  if (!isCpfValid(cpf)) {
    throw { type: 'InvalidCpfException', message: 'CPF is not valid.' };
  }

  next();
}

export { validateCpfParams, validateCpfBody };
