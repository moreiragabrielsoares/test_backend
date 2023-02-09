import { Request, Response } from 'express';
import * as denylistOfCpfsService from '../services/denylistOfCpfsService';
import { IAddNewCpfToDenylist } from '../types/denylistOfCpfsTypes';

async function registerNewDeniedCpf(req: Request, res: Response) {
  const newDeniedCpf = req.body as IAddNewCpfToDenylist;

  const newDeniedCpfRegistered = await denylistOfCpfsService.registerNewDeniedCpf(newDeniedCpf);

  res.status(201).send(newDeniedCpfRegistered);
}

async function getDeniedCpfByCpf(req: Request, res: Response) {
  const { cpf } = req.params;

  const deniedCpfRegistered = await denylistOfCpfsService.getDeniedCpfByCpf(cpf);

  res.status(200).send(deniedCpfRegistered);
}

async function deleteDeniedCpfbyCpf(req: Request, res: Response) {
  const { cpf } = req.params;

  await denylistOfCpfsService.deleteDeniedCpfbyCpf(cpf);

  res.status(200).send('Cpf deleted');
}

async function getAllDeniedCpfByCpf(req: Request, res: Response) {
  const allDeniedCpfsRegistered = await denylistOfCpfsService.getAllDeniedCpfByCpf();

  res.status(200).send(allDeniedCpfsRegistered);
}

export { registerNewDeniedCpf, getDeniedCpfByCpf, deleteDeniedCpfbyCpf, getAllDeniedCpfByCpf };
