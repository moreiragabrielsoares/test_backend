import { jest } from '@jest/globals';
import { isCpfValid } from '../../src/utils/cpfValidator';
import { createNewValidCpf, createNewInvalidCpf } from '../factories/denylistOfCpfsFactory';

beforeEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('cpfValidator util unit tests suite', () => {
  it('given a random valid cpf, it should return true', () => {
    const newValidCpf = createNewValidCpf();

    const result = isCpfValid(newValidCpf);

    expect(result).toBe(true);
  });

  it('given a valid cpf (with first check digit equals zero), it should return true', () => {
    const newValidCpf = '62945614006';

    const result = isCpfValid(newValidCpf);

    expect(result).toBe(true);
  });

  it('given a valid cpf (with second check digit equals zero), it should return true', () => {
    const newValidCpf = '16750799000';

    const result = isCpfValid(newValidCpf);

    expect(result).toBe(true);
  });

  it('given an invalid cpf (case 1: first check digit invalid), it should return false', () => {
    const newInvalidCpf = createNewInvalidCpf();

    const result = isCpfValid(newInvalidCpf);

    expect(result).toBe(false);
  });

  it('given an invalid cpf (case 2: second check digit invalid), it should return false', () => {
    const newInvalidCpf = '11111111110';

    const result = isCpfValid(newInvalidCpf);

    expect(result).toBe(false);
  });

  it('given an invalid cpf format, it should return false', () => {
    const newInvalidCpf = 'abc';

    const result = isCpfValid(newInvalidCpf);

    expect(result).toBe(false);
  });

  it('given an known invalid cpf, it should return false', () => {
    const newInvalidCpf = '11111111111';

    const result = isCpfValid(newInvalidCpf);

    expect(result).toBe(false);
  });
});
