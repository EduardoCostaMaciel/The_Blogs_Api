// npm test src/tests/integraçao/findOneUser.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = { "email": "lewishamilton@gmail.com", "password": "123456" };

const firstUser = {
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
};

describe('FindOneUser - Sua aplicação deve ter o endpoint GET `/user/:id`', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  });

  it('1 - É possível listar um usuário específico com sucesso', async () => {
    let token;
    await frisby
      .post(`${url}/login`, payloadUser)
      .expect('status', 200)
      .then(({ json }) => token = json.token);

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user/1`)
      .expect('status', 200)
      .then(({ json }) => {
        expect(json.id).toBe(1);
        expect(json).toStrictEqual(firstUser);
      });
  });

  it('2 - Não é possível listar um usuário inexistente', async () => {
    let token;
    await frisby
      .post(`${url}/login`, payloadUser)
      .expect('status', 200)
      .then(({ json }) => token = json.token);

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user/9999`)
      .expect('status', 404)
      .then(({ json }) => expect(json.message).toBe('Usuário não existe'));
  });

  it('3 - Não é possível listar um determinado usuário sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user/1`)
      .expect('status', 401)
      .then(({ json }) => expect(json.message).toBe('Token não encontrado'));
  });

  it('4 - Não é possível listar um determinado usuário com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xablau!xablau?',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user/1`)
      .expect('status', 401)
      .then(({ json }) => expect(json.message).toBe('Token expirado ou inválido'));
  });
});
