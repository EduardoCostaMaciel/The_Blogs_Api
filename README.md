# Boas vindas ao repositório do Projeto Api de Posts !

## Aqui você vai encontrar um CRUD;
  - Com os seguintes endpoints:
    - POST
      - /user
      - /login
      - /post
    - GET
      - /user
      - /user/:id
      - /post
      - /post/:id
      - /post/search?q=:searchTerm
    - DELETE
      - /user/me
      - /post/:id
    - PUT
      - /post/:id

## Habilidades Desenvolvidas
  - Back-End
  - Princípios da estrutura REST:
    - Envolvem separar sua API em recursos lógicos. Esses recursos são manipulados através de solicitações HTTP onde o método(GET, POST, PUT, PATCH e DELETE) utilizado tem um significado específico.

  - ORM:
    - O mapeamento objeto-relacional.
  - Criação de tabelas no banco de dados.
    - Com Sequelize.
    - Com MYSQL2.
  - Validações de campos:
    - Com Middleware
    - Com Joi
  - Testes:
    - De Integração
      - Com Jest e Frisby
  - E muito mais ...

## ⚠️ É importante que os arquivos não tenham o nome alterado! ⚠️

<!-- Para entregar o seu projeto você deverá criar um _Pull Request_ neste repositório. -->

## Estrutura das Pastas:
```
.
├── app.js
├── jwt.evaluation.key
├── package.json
├── package-lock.json
├── README.md
├── server.js
└── src
    ├── api
    │   ├── auth
    │   │   ├── jwt
    │   │   │   └── jwtFunc.js
    │   │   └── middlewares
    │   │       └── validToken.js
    │   ├── controllers
    │   │   ├── Logins
    │   │   │   └── login.js
    │   │   ├── Posts
    │   │   │   └── post.js
    │   │   └── Users
    │   │       └── user.js
    │   ├── routers
    │   │   ├── login
    │   │   │   └── login.js
    │   │   ├── Posts
    │   │   │   └── post.js
    │   │   └── Users
    │   │       └── user.js
    │   ├── schemas
    │   │   ├── JoiSchemas
    │   │   │   ├── LoginSchemas
    │   │   │   │   └── loginSchema.js
    │   │   │   ├── PortSchemas
    │   │   │   │   └── postSchema.js
    │   │   │   └── UserSchemas
    │   │   │       └── userSchema.js
    │   │   └── middlewares
    │   │       ├── errorMiddleware.js
    │   │       └── validSchemas.js
    │   └── services
    │       ├── Logins
    │       │   └── login.js
    │       ├── Posts
    │       │   └── post.js
    │       └── Users
    │           └── user.js
    ├── database
    │   ├── config
    │   │   └── config.js
    │   ├── migrations
    │   │   ├── 20220227173315-create-user.js
    │   │   └── 20220227174514-create-post.js
    │   ├── models
    │   │   ├── index.js
    │   │   ├── post.js
    │   │   └── user.js
    │   └── seeders
    │       ├── 20220227173731-user.js
    │       └── 20220227174742-post.js
    └── tests
        ├── integraçao
        │   ├── createPost.test.js
        │   ├── createUser.test.js
        │   ├── deletePost.test.js
        │   ├── deleteUser.test.js
        │   ├── findAllPost.test.js
        │   ├── findAllUser.test.js
        │   ├── findByPkPost.test.js
        │   ├── findOneUser.test.js
        │   ├── loginUser.test.js
        │   ├── searchPost.test.js
        │   └── updatePost.test.js
        └── utils
```
## Instruções para instalação do projeto

Para instalação do projeto, você deverá seguir as instruções a baixo. Fique atento a cada passo, e se tiver qualquer dúvida, envie por <a href="mailto:costaeduardomaciel@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-costaeduardomaciel@gmail.com-blue?style=flat-square&logo=gmail"></a>
<br>
#VQV 🚀

### 1. Clone o repositório
  * No terminal digite:
    * `git clone git@github.com:EduardoCostaMaciel/api_de_blogs.git`.

### 2. Instale as dependências e inicialize o projeto
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd api_de_blogs`
  * No terminal instale as dependências:
    * npm install

### 3. Instale o `Mysql-Server`.
  * Documentação:
    * [Documentação do Mysql](https://www.mysqltutorial.org/)
  * Video:
    * [Video de instalação do mysql-server](https://www.youtube.com/watch?v=CnRRCTMvs8Q&t=19s&ab_channel=hcode)

### 4. Crie na raiz do projeto um arquivo `.env` .
  * Altere os valores dos campos `MYSQL_USER` e `MYSQL_PASSWORD` com os valores que você criou na instalação do `Mysql-Server`, se for necessário altere o valor do campo `HOSTNAME`.

      ```
      MYSQL_USER=nome_do_usuário
      MYSQL_PASSWORD=senha
      HOSTNAME=localhost
      ```
      * exemplo:
          ```
          MYSQL_USER=joao
          MYSQL_PASSWORD=12345
          HOSTNAME=localhost
          ```

### 5. Inicialização da aplicação.
  * No terminal digite.
    1. `npm run start:db`
    2. `npm run pre:start`
    3. `npm run start`
    

---

## Ferramentas Usadas:

  * Banco
    - mysql2:
      - Banco Relacional.
      - Para fazer as relações entre o "users" e "posts".
    - sequelize:
      - Para facilitar as criações das queries e utilizar models e migrations para criar as tabelas.
    - sequelize-cli:
      - É responsável por gerar e executar as operações do sequelize.

  * Node
    - dotenv:
      - É um módulo de dependência zero que carrega variáveis ​​de ambiente de um .env arquivo em process.env.
    - body-parser:
      - Para fazer o parsing do corpo da requisição.
    - express:
      - Fornecer o que precisamos para rodar um servidor, criar rotas e utilizar uma conexão com o banco.
    - jsonwebtoken:
      - Para obter, com segurança, a identidade de um usuário.
    - md5: Para converter o password em uma hash.
    - nodemon:
      - Para facilitar o fluxo de desenvolvimento e inicia a aplicação toda vez que for editada e salvar os arquivos.
    - cors:
      - Para definir quais conexões aceitar.
    - joi:
      - Para validação dos campos do 'body'.
    - express-rescue:
      - Ajuda com a tarefa de garantir que os erros sempre sejam tratados envolvendo em um estrutura de "try" e "catch".

  * Tests
    - jest:
      - É um ótimo framework de testes muito utilizado no mercado e facilita bastante a criação dos testes.
    - frisby:
      - É uma ferramenta de teste de API criada com base no Jest que torna o teste de endpoints de API mais fáceis.
    - shelljs:
      - Para facilitar executar comandos nos testes.

    * `Comandos no terminal para rodar os testes`: ⚠️ A aplicação deve está rodando ⚠️
      * Todos os teste:
        * `npm run test`
      * Um arquivo especifico:
        * `npm run test nome_do_arquivo.test.js`
        * exemplo:
          * `npm run test createPost.test.js`
