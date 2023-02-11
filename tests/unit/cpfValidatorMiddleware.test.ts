/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest } from '@jest/globals';
import * as cpfValidatorMiddleware from '../../src/middlewares/cpfValidatorMiddleware';
import { createNewValidCpf, createNewInvalidCpf } from '../factories/denylistOfCpfsFactory';

beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('cpfValidatorMiddleware unit tests suite', () => {
  it('given valid cpf params, it should verify the cpf and call next', () => {
    const newValidCpf = createNewValidCpf();
    const reqFake = {
      params: {
        cpf: newValidCpf
      }
    };
    const resFake = {};
    const nextFake = jest.fn();

    cpfValidatorMiddleware.validateCpfParams(reqFake, resFake, nextFake);

    expect(nextFake).toHaveBeenCalled();
  });

  it('given invalid cpf params, it should return error "CPF is not valid."', () => {
    const newInvalidCpf = createNewInvalidCpf();
    const reqFake = {
      params: {
        cpf: newInvalidCpf
      }
    };
    const resFake = {};
    const nextFake = jest.fn();

    expect(() => cpfValidatorMiddleware.validateCpfParams(reqFake, resFake, nextFake)).toThrowError(
      new Error('CPF is not valid.')
    );
    expect(nextFake).not.toHaveBeenCalled();
  });

  it('given valid cpf body, it should verify the cpf and call next', () => {
    const newValidCpf = createNewValidCpf();
    const reqFake = {
      body: {
        cpf: newValidCpf
      }
    };
    const resFake = {};
    const nextFake = jest.fn();

    cpfValidatorMiddleware.validateCpfBody(reqFake, resFake, nextFake);

    expect(nextFake).toHaveBeenCalled();
  });

  it('given invalid cpf body, it should return it should return error "CPF is not valid."', () => {
    const newInvalidCpf = createNewInvalidCpf();
    const reqFake = {
      body: {
        cpf: newInvalidCpf
      }
    };
    const resFake = {};
    const nextFake = jest.fn();

    expect(() => cpfValidatorMiddleware.validateCpfBody(reqFake, resFake, nextFake)).toThrowError(
      new Error('CPF is not valid.')
    );
    expect(nextFake).not.toHaveBeenCalled();
  });
});
