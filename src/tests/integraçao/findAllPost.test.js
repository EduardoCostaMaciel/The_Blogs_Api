// npm test src/tests/integraçao/findAllPost.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = {
  email: 'lewishamilton@gmail.com',
  password: '123456',
};

const firstPost = {
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
}
const secondPost = {
  "id": 2,
  "title": "Vamos que vamos",
  "content": "Foguete não tem ré",
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 2,
    "displayName": "Michael Schumacher",
    "email": "MichaelSchumacher@gmail.com",
    "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
  }
}

describe('FindAllPost - Deve ter o endpoint GET `/post`', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  });

  it('1 - É possível listar todos "posts" com sucesso', async () => {
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
      .get(`${url}/post`)
      .expect('status', 200)
      .then(({json}) => {
        expect(json[0]).toStrictEqual(firstPost);
        expect(json[1]).toStrictEqual(secondPost);
      });
  });

  it('2 - Não é possível listar "posts" sem token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('3 - Não é possível listar "posts" com token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xablau!xablau?',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });
});

