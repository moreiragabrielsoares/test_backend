import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

function validateSchema(schema: joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw { type: 'InvalidCpfException', message: 'CPF is not valid.' };
      // return res.status(422).send(error.details.map((detail: joi.ValidationErrorItem) => detail.message));
      // Seria possível também termos a opção acima em casos de multiplos erros (bodies com mais campos)
    }

    next();
  };
}

export { validateSchema };
