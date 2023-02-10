import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidatorMiddleware';
import { validateCpfParams, validateCpfBody } from '../middlewares/cpfValidatorMiddleware';
import { addNewCpfToDenylistSchema } from '../schemas/denylistOfCpfsSchemas';
import * as denylistOfCpfsController from '../controllers/denylistOfCpfsController';

const denylistOfCpfsRouter = Router();

denylistOfCpfsRouter.post(
  '/cpf',
  validateSchema(addNewCpfToDenylistSchema),
  validateCpfBody,
  denylistOfCpfsController.registerNewDeniedCpf
);

denylistOfCpfsRouter.get('/cpf/:cpf', validateCpfParams, denylistOfCpfsController.getDeniedCpfByCpf);

denylistOfCpfsRouter.delete('/cpf/:cpf', validateCpfParams, denylistOfCpfsController.deleteDeniedCpfbyCpf);

denylistOfCpfsRouter.get('/cpf', denylistOfCpfsController.getAllDeniedCpfByCpf);

export { denylistOfCpfsRouter };
