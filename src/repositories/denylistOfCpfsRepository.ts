import { prisma } from '../database/database';
import { IAddNewCpfToDenylist } from 'types/denylistOfCpfsTypes';

async function registerNewDeniedCpf(newDeniedCpf: IAddNewCpfToDenylist) {
  return await prisma.denylistOfCpfs.create({
    data: newDeniedCpf,
    select: {
      cpf: true,
      createdAt: true
    }
  });
}

async function getDeniedCpfByCpf(deniedCpf: string) {
  return await prisma.denylistOfCpfs.findUnique({
    where: { cpf: deniedCpf },
    select: {
      cpf: true,
      createdAt: true
    }
  });
}

async function deleteDeniedCpfbyCpf(deniedCpf: string) {
  return await prisma.denylistOfCpfs.delete({
    where: { cpf: deniedCpf }
  });
}

async function getAllDeniedCpfs() {
  return await prisma.denylistOfCpfs.findMany({
    select: {
      cpf: true,
      createdAt: true
    }
  });
}

export { registerNewDeniedCpf, getDeniedCpfByCpf, deleteDeniedCpfbyCpf, getAllDeniedCpfs };
