<h1 align="center">:file_cabinet: Store Manager</h1>

## :memo: Descrição/ Description
 RESTful API application using the MVC (model-service-controller) architecture for a sales management system in dropshipping format/ Aplicação API RESTful utilizando a arquitetura MVC (model-service-controller)para um sistema de gerenciamento de vendas no formato dropshipping.

API a ser construída é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Você deverá utilizar o banco de dados MySQL para a gestão de dados. Além disso, a API deve ser RESTful.
## :books: Funcionalidades/ Functionalities
* <b>CRUD API</b>: (Create, Read, Update e Delete) of products and sales
* <b>Data storage</b> Relational database MySQL.
* <b>Unit tests</b> With mocha, chai e sinon.
<details>
  <summary id="diagrama-scripts"><strong>🎲  Relational database MySQL</strong></summary>

#### Entity-Relationship Diagram

![DER](./images/erStoreManager.png)
</details>

## :wrench: Tecnologias/ Technologies
* Node;
* Typescript;
* RESTful API;
* Docker;
* MySQL;
* Mocha
* Chai
* Sinon

## :rocket: Rodando o projeto/ Running the project
* To run the repository it is necessary to clone it, give the following command to start the project:
- Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para iniciar o projeto:
```
npm install
```
- To up and access the docker terminal/ Para levantar e acessar o terminal docker:
```
docker-compose up -d
docker exec -it store_manager bash
npm install
```
- Create the database and generate the tables/ Criar o banco de dados e gerar as tabelas:

```sh
  npm run migration
```

- Clean and populate the database/ Limpar e popular o banco de dados:

```sh
  npm run seed
```
- Start application/ Executar a aplicação/

```
npm start
```
- Or start with Nodemon
```
  npm run debug
```
Run the unit tests

```
  npm run test:mocha
```

## :dart: Status do projeto/ Project status
- Finished project/  Projeto finalizado/.