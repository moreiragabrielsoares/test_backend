import { Router } from 'express';
import { validateSchema } from '../middlewares/schemaValidatorMiddleware';
import { validateCpf } from '../middlewares/cpfValidatorMiddleware';
import { addNewCpfToDenylistSchema } from '../schemas/denylistOfCpfsSchemas';
import * as denylistOfCpfsController from '../controllers/denylistOfCpfsController';

const denylistOfCpfsRouter = Router();

denylistOfCpfsRouter.post(
  '/cpf',
  validateSchema(addNewCpfToDenylistSchema),
  validateCpf,
  denylistOfCpfsController.registerNewDeniedCpf
);

denylistOfCpfsRouter.get('/cpf/:cpf', validateCpf, denylistOfCpfsController.getDeniedCpfByCpf);

denylistOfCpfsRouter.delete('/cpf/:cpf', validateCpf, denylistOfCpfsController.deleteDeniedCpfbyCpf);

denylistOfCpfsRouter.get('/cpf', denylistOfCpfsController.getAllDeniedCpfByCpf);

export { denylistOfCpfsRouter };
