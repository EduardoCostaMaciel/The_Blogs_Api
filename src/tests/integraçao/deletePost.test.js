// npm test src/tests/integraçao/deletePost.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const firstUser = {
  email: 'lewishamilton@gmail.com',
  password: '123456',
};
const secondUser = {
  email: 'MichaelSchumacher@gmail.com',
  password: '123456',
};

describe('DeletePost - Deve ter o endpoint DELETE para "post/:id"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run pre:start');
  });

  it('1 - É possível deletar um "post" com sucesso !', async () => {
    let token;
    await frisby
      .post(`${url}/login`, firstUser)
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
      .delete(`${url}/post/1`)
      .expect('status', 204);
  });

  it('2 - Não é possível deletar um "post" com usuário não autorizado !', async () => {
    let token;
    await frisby
      .post(`${url}/login`, secondUser)
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
      .delete(`${url}/post/1`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Usuário não autorizado'));
  });

  it('3 - Não é possível deletar um "post" que não existe !', async () => {
    let token;
    await frisby
      .post(`${url}/login`, firstUser)
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
      .delete(`${url}/post/9999`)
      .expect('status', 404)
      .then(({json}) => expect(json.message).toBe('Post não existe'));
  });

  it('4 - Não é possível deletar um "post" sem o token !', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/post/1`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('5 - Não é possível deletar um "post" com o token inválido !', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xablau!xablau?',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/post/1`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });
});
