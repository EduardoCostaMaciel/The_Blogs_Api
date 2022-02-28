const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
payloadUser = { "email": "lewishamilton@gmail.com", "password": "123456" };

const firstUser = {
  "id": 1,
  "displayName": "Lewis Hamilton",
  "email": "lewishamilton@gmail.com",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
};

const secondUser = {
  "id": 2,
  "displayName": "Michael Schumacher",
  "email": "MichaelSchumacher@gmail.com",
  "image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
};

describe('FindAllUser - Aplicação deve ter o endpoint GET "/user"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  });

  it('1 - Será valido possível listar todos os usuários', async () => {
    let token;
    await frisby
      .post(`${ url }/login`, payloadUser)
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
      .get(`${ url }/user`)
      .expect('status', 200)
      .then(({ json }) => {
        expect(json[0]).toStrictEqual(firstUser);
        expect(json[1]).toStrictEqual(secondUser);
      });
  });

  it('2 - Não é possível lista usuários sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${ url }/user`)
      .expect('status', 401)
      .then(({json}) => expect(json.message).toBe('Token não encontrado'));
  });

  it('3 - Não é possível lista usuários com token inválido', async () => {
    await frisby
    .setup({
      request: {
        headers: {
          Authorization: 'xablau!xablau?',
          'Content-Type': 'application/json',
        },
      },
    })
    .get(`${ url }/user`)
    .expect('status', 401)
    .then(({json}) => expect(json.message).toBe('Token expirado ou inválido'));
  });
});
