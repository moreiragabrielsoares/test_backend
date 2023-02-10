/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import supertest from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/database/database';
import { createNewValidCpf, createNewInvalidCpf } from '../factories/denylistOfCpfsFactory';

const server = supertest(app);

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE denylist_cpfs RESTART IDENTITY;`;
});

describe('GET /cpf', () => {
  it('it should return an array and status 200', async () => {
    const result = await server.get('/cpf');

    expect(result.body).toBeInstanceOf(Array);
    expect(result.status).toEqual(200);
  });
});

describe('POST /cpf', () => {
  it('given a valid new cpf and body it should return an object and status 201', async () => {
    const newCpf = createNewValidCpf();
    const newCpfBody = { cpf: newCpf };

    const result = await server.post('/cpf').send(newCpfBody);

    const insertedCpf = await prisma.denylistOfCpfs.findUnique({
      where: { cpf: newCpf }
    });

    expect(result.body.cpf).toEqual(newCpf);
    expect(result.body.cpf).toEqual(insertedCpf?.cpf);
    expect(result.status).toEqual(201);
  });

  it('given a invalid body it should return status 422', async () => {
    const invalidBody = {};

    const result = await server.post('/cpf').send(invalidBody);

    expect(result.status).toEqual(422);
    expect(result.body).toEqual({ type: 'InvalidCpfException', message: 'CPF is not valid.' });
  });

  it('given a invalid cpf it should return status 422', async () => {
    const newInvalidCpf = createNewInvalidCpf();
    const newCpfBody = { cpf: newInvalidCpf };

    const result = await server.post('/cpf').send(newCpfBody);

    expect(result.status).toEqual(422);
    expect(result.body).toEqual({ type: 'InvalidCpfException', message: 'CPF is not valid.' });
  });

  it('given a duplicated new cpf it should return status 409', async () => {
    const newValidCpf = createNewValidCpf();
    const newCpfBody = { cpf: newValidCpf };

    await prisma.denylistOfCpfs.create({
      data: newCpfBody
    });

    const result = await server.post('/cpf').send(newCpfBody);

    expect(result.status).toEqual(409);
    expect(result.body).toEqual({ type: 'ExistsCpfException', message: 'This cpf is already denied' });
  });
});

describe('GET /cpf/:cpf', () => {
  it('given a valid and registered cpf it should return the denied cpf registered and status 200', async () => {
    const newCpf = createNewValidCpf();

    const insertedCpf = await prisma.denylistOfCpfs.create({
      data: { cpf: newCpf }
    });

    const result = await server.get(`/cpf/${newCpf}`);

    expect(result.body.cpf).toEqual(insertedCpf.cpf);
    expect(result.status).toEqual(200);
  });

  it('given a valid but not registered cpf it should return status 404', async () => {
    const newValidCpf = createNewValidCpf();

    const result = await server.get(`/cpf/${newValidCpf}`);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({ type: 'NotFoundCpfException', message: 'This cpf is not denied' });
  });

  it('given an invalid cpf it should return status 422', async () => {
    const newInvalidCpf = createNewInvalidCpf();

    const result = await server.get(`/cpf/${newInvalidCpf}`);

    expect(result.status).toEqual(422);
    expect(result.body).toEqual({ type: 'InvalidCpfException', message: 'CPF is not valid.' });
  });
});

describe('DELETE /cpf/:cpf', () => {
  it('given a valid and registered cpf it should delete the cpf from the denylist', async () => {
    const newCpf = createNewValidCpf();

    await prisma.denylistOfCpfs.create({
      data: { cpf: newCpf }
    });

    const result = await server.delete(`/cpf/${newCpf}`);

    const deniedCpf = await prisma.denylistOfCpfs.findUnique({
      where: { cpf: newCpf }
    });

    expect(result.status).toEqual(200);
    expect(deniedCpf).toBe(null);
  });

  it('given a valid but not registered cpf it should return status 404', async () => {
    const newValidCpf = createNewValidCpf();

    const result = await server.delete(`/cpf/${newValidCpf}`);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({ type: 'NotFoundCpfException', message: 'This cpf is not denied' });
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
