// npm test src/tests/integraçao/updatePost.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = {
  email: 'lewishamilton@gmail.com',
  password: '123456',
};
const secondUser = {
  email: 'MichaelSchumacher@gmail.com',
  password: '123456',
};

const payloadPost = {
  title: 'Xablau sim !',
  content: 'Trybe é a melhor',
};

const mockPost = {
  title: 'Xablau sim !',
  content: 'Trybe é a melhor',
  userId: 1,
};

const titleNotExist = { content: 'Trybe é a melhor' };
const contentNotExist = { title: 'Xablau sim !' };

describe('UpdatePost - Deve ter o endpoint PUT "/post/:id"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run pre:start');
  });

  it('1 - É possível editar um "post" com sucesso', async () => {
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
      .put(`${url}/post/1`, payloadPost)
      .expect('status', 200)
      .then(({json}) => {
        expect(json.userId).toBe(1);
        expect(json).toStrictEqual(mockPost);
      });
  });

  it('2 - Não é possível editar um "post" com outro usuário', async () => {
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
      .put(`${url}/post/1`, payloadPost)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Usuário não autorizado'));
  });

  it('3 - Não possível editar "post" sem token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/post/1`, payloadPost)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('4 - Não possível editar um "post" com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xablau!xablau?',
            'Content-Type': 'application/json',
          },
        },
      })
      .put(`${url}/post/1`, payloadPost)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });

  it('5 - Não possível editar um "post" sem o campo `title`', async () => {
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
      .put(`${url}/post/1`, titleNotExist)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"title\" is required'));
  });

  it('6 - Não possível editar um "post" sem o campo `content`', async () => {
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
      .put(`${url}/post/1`, contentNotExist)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"content\" is required'));
  });
});
