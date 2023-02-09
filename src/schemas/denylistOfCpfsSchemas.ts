import joi from 'joi';
import { IAddNewCpfToDenylist } from 'types/denylistOfCpfsTypes';

const addNewCpfToDenylistSchema = joi.object<IAddNewCpfToDenylist>({
  cpf: joi
    .string()
    .pattern(/(^[0-9]{11}$)/)
    .required()
});

export { addNewCpfToDenylistSchema };
