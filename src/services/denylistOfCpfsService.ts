import { IAddNewCpfToDenylist } from 'types/denylistOfCpfsTypes';
import * as denylistOfCpfsRepository from '../repositories/denylistOfCpfsRepository';

async function registerNewDeniedCpf(newDeniedCpf: IAddNewCpfToDenylist) {
  const deniedCpf = await denylistOfCpfsRepository.getDeniedCpfByCpf(newDeniedCpf.cpf);

  if (deniedCpf) {
    throw { type: 'ExistsCpfException', message: 'This cpf is already denied' };
  }

  return await denylistOfCpfsRepository.registerNewDeniedCpf(newDeniedCpf);
}

async function getDeniedCpfByCpf(deniedCpf: string) {
  const cpf = await denylistOfCpfsRepository.getDeniedCpfByCpf(deniedCpf);

  if (!cpf) {
    throw { type: 'NotFoundCpfException', message: 'This cpf is not denied' };
  }

  return cpf;
}

async function deleteDeniedCpfbyCpf(deniedCpf: string) {
  const cpf = await denylistOfCpfsRepository.getDeniedCpfByCpf(deniedCpf);

  if (!cpf) {
    throw { type: 'NotFoundCpfException', message: 'This cpf is not denied' };
  }

  await denylistOfCpfsRepository.deleteDeniedCpfbyCpf(deniedCpf);
}

async function getAllDeniedCpfs() {
  const cpfs = await denylistOfCpfsRepository.getAllDeniedCpfs();

  return cpfs;
}

export { registerNewDeniedCpf, getDeniedCpfByCpf, deleteDeniedCpfbyCpf, getAllDeniedCpfs };
