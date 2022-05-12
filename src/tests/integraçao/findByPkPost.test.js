// npm test src/tests/integraçao/findByPkPost.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = {
  email: 'lewishamilton@gmail.com',
  password: '123456',
};
const mockPost = {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  }
};

describe('FindByPkPost - Deve ter o endpoint GET "post/:id"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run pre:start');
  });

  it('1 - É possível listar um "post" com sucesso', async () => {
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
      .get(`${url}/post/1`)
      .expect('status', 200)
      .then(({json}) => {
        expect(json.id).toBe(1);
        expect(json).toStrictEqual(mockPost);
      });
  });

  it('2 - Não é possível listar "post" sem token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/1`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('3 - Não é possível listar um "post" com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xablau!xablau?',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/1`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });

  it('4 - Não é possível listar "post" inexistente', async () => {
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
      .get(`${url}/post/999`)
      .expect('status', 404)
      .then(({json}) => expect(json.message).toBe('Post não existe'));
  });
});
