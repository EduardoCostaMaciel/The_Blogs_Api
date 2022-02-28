// npm test src/tests/integraçao/deleteUser.test.js

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


describe('DeleteUser - Deve ter o endpoint DELETE "/user/:me"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  });

  it('1 - É possível deletar meu usuário com sucesso', async () => {
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
      .delete(`${url}/user/me`)
      .expect('status', 204);
  });

  it('2 - Não é possível deletar meu usuário com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xabla!xabla?',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/user/me`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });

  it('3 - Não é possível deletar meu usuário sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/user/me`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });
});