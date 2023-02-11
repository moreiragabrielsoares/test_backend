/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import * as denylistOfCpfsService from '../../src/services/denylistOfCpfsService';
import * as denylistOfCpfsRepository from '../../src/repositories/denylistOfCpfsRepository';
import { createNewValidCpf } from '../factories/denylistOfCpfsFactory';

beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('denylistOfCpfsService unit tests suite', () => {
  it('it should insert a new cpf on denylist of cpfs', async () => {
    const newCpf = createNewValidCpf();

    jest.spyOn(denylistOfCpfsRepository, 'getDeniedCpfByCpf').mockImplementationOnce((): any => {});

    jest.spyOn(denylistOfCpfsRepository, 'registerNewDeniedCpf').mockImplementationOnce((): any => {});

    await denylistOfCpfsService.registerNewDeniedCpf({ cpf: newCpf });

    expect(denylistOfCpfsRepository.getDeniedCpfByCpf).toBeCalled();
    expect(denylistOfCpfsRepository.registerNewDeniedCpf).toBeCalled();
  });

  it('it should not insert a duplicated cpf on denylist of cpfs', () => {
    const newCpf = createNewValidCpf();

    jest.spyOn(denylistOfCpfsRepository, 'getDeniedCpfByCpf').mockImplementationOnce((): any => {
      return newCpf;
    });

    jest.spyOn(denylistOfCpfsRepository, 'registerNewDeniedCpf');

    const promise = denylistOfCpfsService.registerNewDeniedCpf({ cpf: newCpf });

    void expect(promise).rejects.toEqual({
      type: 'ExistsCpfException',
      message: 'This cpf is already denied'
    });

    expect(denylistOfCpfsRepository.registerNewDeniedCpf).not.toBeCalled();
  });

  it('it should return the denied cpf', async () => {
    const cpf = createNewValidCpf();

    jest.spyOn(denylistOfCpfsRepository, 'getDeniedCpfByCpf').mockImplementationOnce((): any => {
      return { cpf };
    });

    const result = await denylistOfCpfsService.getDeniedCpfByCpf(cpf);

    expect(denylistOfCpfsRepository.getDeniedCpfByCpf).toBeCalled();
    expect(result).toEqual({ cpf });
  });

  it('it should return NotFoundCpfException when trying to get one not registered cpf', () => {
    const cpf = createNewValidCpf();

    jest.spyOn(denylistOfCpfsRepository, 'getDeniedCpfByCpf').mockImplementationOnce((): any => {});

    const promise = denylistOfCpfsService.getDeniedCpfByCpf(cpf);

    void expect(promise).rejects.toEqual({
      type: 'NotFoundCpfException',
      message: 'This cpf is not denied'
    });

    expect(denylistOfCpfsRepository.getDeniedCpfByCpf).toBeCalled();
  });

  it('it should delete the given cpf from denylist', async () => {
    const cpf = createNewValidCpf();

    jest.spyOn(denylistOfCpfsRepository, 'getDeniedCpfByCpf').mockImplementationOnce((): any => {
      return { cpf };
    });

    jest.spyOn(denylistOfCpfsRepository, 'deleteDeniedCpfbyCpf').mockImplementationOnce((): any => {});

    await denylistOfCpfsService.deleteDeniedCpfbyCpf(cpf);

    expect(denylistOfCpfsRepository.getDeniedCpfByCpf).toBeCalled();
    expect(denylistOfCpfsRepository.deleteDeniedCpfbyCpf).toBeCalled();
  });

  it('it should return NotFoundCpfException when trying to delete one not registered cpf', () => {
    const cpf = createNewValidCpf();

    jest.spyOn(denylistOfCpfsRepository, 'getDeniedCpfByCpf').mockImplementationOnce((): any => {});

    const promise = denylistOfCpfsService.deleteDeniedCpfbyCpf(cpf);

    void expect(promise).rejects.toEqual({
      type: 'NotFoundCpfException',
      message: 'This cpf is not denied'
    });

    expect(denylistOfCpfsRepository.getDeniedCpfByCpf).toBeCalled();
  });

  it('it should return all the denylist', async () => {
    jest.spyOn(denylistOfCpfsRepository, 'getAllDeniedCpfs').mockImplementationOnce((): any => {
      return [];
    });

    const result = await denylistOfCpfsService.getAllDeniedCpfs();

    expect(denylistOfCpfsRepository.getAllDeniedCpfs).toBeCalled();
    expect(result).toEqual([]);
  });
});
