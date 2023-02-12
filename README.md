## Descrição

Este projeto constitui uma API para cadastro de CPFs em uma lista bloqueada.

## Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Joi](https://joi.dev/)
- [Jest](https://jestjs.io/)
- [Pino](https://getpino.io/#/)

## Rodando e Testando a Aplicação (Docker)

- Para rodar a aplicação, rode o comando abaixo

  ```bash
  $ docker-compose up
  ```

  Obs: Irá aparecer a mensagem "Server listening on port: 4002" no terminal. Mas vale reforçar que essa porta 4002 é a porta do container, no localhost a aplicação está disponível na porta 5000.

- Para rodar os testes automatizados de integração com coverage, rode o comando abaixo na pasta raiz do projeto

  ```bash
  $ docker-compose run app npm run test:integration:coverage
  ```

- Para rodar os testes automatizados unitários com coverage, rode o comando abaixo na pasta raiz do projeto

  ```bash
  $ docker-compose run app npm run test:unit:coverage
  ```

## Rodando e Testando a Aplicação (Localmente com somente o PostgreSQL no Docker)

- Para instalar as dependências, rode o comando abaixo:

  ```bash
  $ npm install
  ```

- Para dispobibilizar o banco de dados postgres via docker:

  ```bash
  $ docker run -d -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=db_maxmilhas -p 5433:5432 postgres:14-alpine
  ```

- Para configurar o banco de dados:

  ```bash
  $ npx prisma migrate dev
  ```

- Para rodar a aplicação:

  ```bash
  $ npm run dev
  ```

  ou

  ```bash
  $ npm run dev:watch
  ```

- Para rodar os testes automatizados unitários com coverage:

  ```bash
  $ npm run test:integration:coverage
  ```

- Para rodar os testes automatizados unitários com coverage:

  ```bash
  $ npm run test:unit:coverage
  ```

## Testando Manualmente

- O arquivo thunder-collection_test_maxmilhas.json é uma coleção pronta para realizar alguns testes manuais. Basta utilizar a extensão Thunder Client do VS Code e importar o arquivo. (lembrando que antes de testar manualmente, é necessário rodar a aplicação com "docker-compose up" ou "npm run dev")
- Se preferir utilizar o Postman, basta utilizar o arquivo thunder-collection_test_maxmilhas_postman.json

## Features

- Registrar CPF na lista
- Consultar se CPF está na lista
- Remover CPF da lista
- Consultar todos os CPFs da lista

## Rotas

- **POST** `/cpf` - Registra um novo CPF

  Esta rota espera receber um body com o seguinte formato:

  ```yaml
  {
    "cpf": "47547829090"
  }
  ```

  - O valor do CPF será validado conforme explicação deste [algoritmo](https://www.macoratti.net/alg_cpf.htm#:~:text=O), além de também serem considerados inválidos os casos de dígitos repetidos ("11111111111", "22222222222", ... ). Se o seu valor não passar nessa validação ou se o body enviado estiver em um formato inválido, será retornado status 422 e o body abaixo:
    ```yaml
    {
      "type": "InvalidCpfException",
      "message": "CPF is not valid."
    }
    ```
  - Se o CPF enviado no body já estiver na lista, será retornado status 409 e o body abaixo:
    ```yaml
    {
      "type": "ExistsCpfException",
      "message": "This cpf is already denied"
    }
    ```
  - **Em caso de sucesso**, será retornado status 201 e o body abaixo:
    ```yaml
    {
      "cpf": "47547829090",
      "createdAt": "2023-02-11T00:28:29.497Z"
    }
    ```

<br/>

- **GET** `/cpf/:cpf` - Retorna o CPF restrito (se registrado). Params :cpf -> Exemplo: '85584079081' (11 dígitos numéricos)

  - Se o CPF enviado estiver com o formato inválido ou não for um CPF válido conforme regra de validação, será retornado status 422 e o body abaixo:
    ```yaml
    {
      "type": "InvalidCpfException",
      "message": "CPF is not valid."
    }
    ```

  - Se o CPF enviado não estiver na lista, será retornado status 404 e o body abaixo:
    ```yaml
    {
      "type": "NotFoundCpfException",
      "message": "This cpf is not denied"
    }
    ```
  - **Em caso de sucesso**, será retornado status 200 e o body abaixo:
    ```yaml
    {
      "cpf": "47547829090",
      "createdAt": "2023-02-11T00:28:29.497Z"
    }
    ```

  <br/>

- **DELETE** `/cpf/:cpf` - Deleta um CPF da lista restrita (se registrado). Params :cpf -> Exemplo: '85584079081' (11 dígitos numéricos)

  - Se o CPF enviado estiver com o formato inválido ou não for um CPF válido conforme regra de validação, será retornado status 422 e o body abaixo:
    ```yaml
    {
      "type": "InvalidCpfException",
      "message": "CPF is not valid."
    }
    ```

  - Se o CPF enviado não estiver na lista, será retornado status 404 e o body abaixo:
    ```yaml
    {
      "type": "NotFoundCpfException",
      "message": "This cpf is not denied"
    }
    ```
  - **Em caso de sucesso**, será retornado status 200 e a mensagem "Cpf deleted"

  <br/>

- **GET** `/cpf` - Retorna todos os CPFs da lista restrita

  Exemplo de retorno:

  ```yaml
  [
    {
      "cpf": "47547829090",
      "createAt": "2023-02-11T00:28:29.497Z"
    },
    {
      "cpf": "06567088087",
      "createAt": "2023-02-11T00:24:27.497Z"
    },
    .
    .
    .
  ]
  ```
