const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';

const payloadLogin = { "email": "lewishamilton@gmail.com", "password": "123456" };
const email = {"email": "lewishamilton@gmail.com"};
const password = {"password": "123456"};
const blankEmailField = { "email": "", "password": "123456" };
const blankPasswordField = { "email": "lewishamilton@gmail.com", "password": "" };

const userNotExist = { "email": "rubensJK@gmail.com", "password": "123456" };

describe('Login - Sua aplicação deve ter o endpoint Post "/login"', () => {
  beforeEach(async () => {
    shell.exec('npm run drop');
    shell.exec('npm run pre:start');
  });

  it('1 - Login realizado com sucesso', async () => {
    await frisby
      .post(`${url}/login`, payloadLogin)
      .expect('status', 200)
      .then(({json}) => expect(json.token).not.toBeNull());
  });

  it('2 - Não é possível fazer login sem o campo "email"', async () => {
    await frisby
      .post(`${url}/login`, password)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"email\" is required'));
  });

  it('3 - Não é possível fazer login sem o campo "password"', async () => {
    await frisby
      .post(`${url}/login`, email)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"password\" is required'))
  });

  it('4 - Não é possível fazer login com o campo "email" em branco', async () => {
    await frisby
      .post(`${url}/login`, blankEmailField)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"email\" is not allowed to be empty'));
  });

  it('5 - Não é possível fazer login com o campo "password" em branco', async () => {
    await frisby
      .post(`${url}/login`, blankPasswordField)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('\"password\" is not allowed to be empty'));
  });

  it('6 - Não é possível fazer login com usuário que não existe', async () => {
    await frisby
      .post(`${url}/login`, userNotExist)
      .expect('status', 400)
      .then(({json}) => expect(json.message).toBe('Campos inválidos'));
  });
});
