// npm test src/tests/integraçao/createPost.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = {
  email: 'lewishamilton@gmail.com',
  password: '123456',
};

const payloadPost = {
  title: 'Fórmula 1',
  content: 'O campeão do ano!',
};

const mockPost = {
  title: 'Fórmula 1',
  content: 'O campeão do ano!',
  userId: 1,
};

const missingTitle = {
  content: 'O campeão do ano!',
};

const missingContent = {
  title: 'Fórmula 1',
};

describe('CreatePost - Deve ter o endpoint POST "/post"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  });

  it('1 - É possível criar um post com sucesso', async () => {
    let token;
    await frisby
      .post(`${url}/login`, payloadUser)
      .expect('status', 200)
      .then(({json}) => token = json.token);

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/post`, payloadPost)
      .then(({json}) => expect(json).toStrictEqual(mockPost));
  });

  it('2 - Não é possível criar um post sem o "title"', async () => {
    let token;
    await frisby
      .post(`${url}/login`, payloadUser)
      .expect('status', 200)
      .then(({json}) => token = json.token);

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/post`, missingTitle)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"title\" is required'))
  });

  it('3 - Não é possível criar um post sem o "content"', async () => {
    let token;
    await frisby
      .post(`${url}/login`, payloadUser)
      .expect('status', 200)
      .then(({json}) => token = json.token);

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/post`, missingContent)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"content\" is required'));
  });

  it('4 - Não é possível criar um post sem o "token"', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/post`, payloadPost)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('5 - Não é possível criar um post com um token inválido', async () => {
    await frisby
    .setup({
      request: {
        headers: {
          Authorization: 'xablau!xablau?',
          'Content-Type': 'application/json',
        },
      },
    })
    .post(`${ url }/post`, payloadPost)
    .expect('status', 401)
    .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });
});
