import { DenylistOfCpfs } from '@prisma/client';

type IAddNewCpftoDenylist = Omit<DenylistOfCpfs, 'id' | 'createdAt'>;

export { IAddNewCpftoDenylist };
