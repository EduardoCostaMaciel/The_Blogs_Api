# Boas vindas ao repositório do Projeto Api de Posts !

Para instalação do projeto, você deverá seguir as instruções a baixo. Fique atento a cada passo, e se tiver qualquer dúvida, envie por <a href="mailto:costaeduardomaciel@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-costaeduardomaciel@gmail.com-blue?style=flat-square&logo=gmail"></a>
<br>
#VQV 🚀

## Aqui você vai encontrar um CRUD de posts de blog;
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

# Habilidades Desenvolvidas
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
# Instruções para instalação do projeto

### 1. Clone o repositório
  * `git@github.com:EduardoCostaMaciel/api_de_blogs.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd api_de_blogs`

### 2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * npm install

### 3. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora, crie uma branch onde você vai guardar os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b joaozinho-project-api-de-blogPost`

### 4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (devem aparecer listados os novos arquivos em vermelho)
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
        * `git status` (devem aparecer listados os arquivos em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto.'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

### 5. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin joaozinho-project-api-de-blogPost`

### 6. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/EduardoCostaMaciel/api_de_blogs)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_, um título que o identifique, e clique no botão verde _"Create pull request"_. Crie da seguinte forma: `[JOAOZINHO] Projeto Api De BlogPost`
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/EduardoCostaMaciel/api_de_blogs) e confira que o seu _Pull Request_ está criado.
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

  * Note
    - dotenv:
      - É um módulo de dependência zero que carrega variáveis ​​de ambiente de um .env arquivo em process.env.
    - body-parser:
      - Para fazer o parsing do corpo da requisição.
    - express:
      - Fornecer o que precisamos para rodar um servidor, criar rotas e utilizar uma conexão com o banco.
    - jsonwebtoken:
      - Para obter, com segurança, a identidade de um usuário.
    - nodemon:
      - Para facilitar o fluxo de desenvolvimento e inicia a aplicação toda vez que for editada e salvar os arquivos.
    - cors:
      - Para definir quais conexões aceitar
    - joi:
      - Para validação dos campos do 'body'.
    - express-rescue:
      - Ajuda com a tarefa de garantir que os erros sempre sejam tratados envolvendo em um estrutura de "try" e "catch".
    - md5:

  * Tests
    - shelljs:
      - Para facilitar executar comandos nos testes.
    - frisby:
      - É uma ferramenta de teste de API criada com base no Jest que torna o teste de endpoints de API mais fáceis.
    - jest:
      - É um ótimo framework de testes.
      - Para facilitar a criação dos testes.
