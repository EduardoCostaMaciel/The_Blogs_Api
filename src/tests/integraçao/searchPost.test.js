// npm test src/tests/integraçao/searchPost.test.js

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = {
  email: 'MichaelSchumacher@gmail.com',
  password: '123456',
};

const payloadPost = {
  title: 'Fórmula 1',
  content: 'O campeão do ano!',
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
};

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
};

describe('SearchPost - Deve existir um endpoint GET "post/search?q=:searchTerm"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  });

  it('1 - É possível buscar um "post" pelo "title"', async () => {
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
      .get(`${url}/post/search?q=Vamos que vamos`)
      .expect('status', 200)
      .then(({json}) => {
        expect(json[0].id).toBe(2);
        expect(json[0]).toStrictEqual(secondPost);
      });
  });

  it('2 - É possível buscar um "post" pelo "content"', async () => {
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
      .get(`${url}/post/search?q=Foguete não tem ré`)
      .expect('status', 200)
      .then(({json}) => {
        expect(json[0].id).toBe(2);
        expect(json[0]).toStrictEqual(secondPost);
      });
  });

  it('3 - É possível buscar todos os "post" quando não passa nada na busca', async () => {
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
      .get(`${url}/post/search?q=`)
      .expect('status', 200)
      .then(({json}) => {
        expect(json[0].id).toBe(1);
        expect(json[0]).toStrictEqual(firstPost);
        expect(json[1].id).toBe(2);
        expect(json[1]).toStrictEqual(secondPost);
      });
  });

  it('4 - É possível buscar um "post" que não existe e retornar um array vazio "[]"', async () => {
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
      .get(`${url}/post/search?q=xablau!xablau?`)
      .expect('status', 200)
      .then(({json}) => expect(json).toStrictEqual([]));
  });

  it('5 - Não é possível buscar "post" sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=vamos que vamos`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('6 - Não é possível buscar um "post" com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 'xablau!xablau?',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/post/search?q=vamos que vamos`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });
});
