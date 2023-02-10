import { Request, Response, NextFunction } from 'express';
import { isCpfValid } from '../utils/cpfValidator';

function validateCpfParams(req: Request, res: Response, next: NextFunction) {
  const { cpf } = req.params;

  if (!isCpfValid(cpf)) {
    throw { type: 'InvalidCpfException', message: 'CPF is not valid.' };
  }

  res.locals.session = cpf;
  next();
}

//eslint foi desativado na linha abaixo pois, em função do schemaValidatorMiddleware,
//temos certeza de que não teremos unsafe assignment ou argument
function validateCpfBody(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { cpf } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!isCpfValid(cpf)) {
    throw { type: 'InvalidCpfException', message: 'CPF is not valid.' };
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  res.locals.session = cpf;
  next();
}

export { validateCpfParams, validateCpfBody };
