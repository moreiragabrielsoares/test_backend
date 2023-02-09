import { Request, Response, NextFunction } from 'express';
import { isCpfValid } from '../utils/cpfValidator';

function validateCpf(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.params;

  if (!isCpfValid(cpf)) {
    throw { type: 'InvalidCpfException', message: 'CPF is not valid.' };
  }

  res.locals.session = cpf;
  next();
}

export { validateCpf };
