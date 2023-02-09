import { DenylistOfCpfs } from '@prisma/client';

type IAddNewCpfToDenylist = Omit<DenylistOfCpfs, 'id' | 'createdAt'>;

export { IAddNewCpfToDenylist };
