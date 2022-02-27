// "test": "jest --runInBand"

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const payloadUser = {
  "displayName": "rubens silva",
  "email": "rubensJK@gmail.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const displayNameIsRequired = {
  "email": "rubensJK@gmail.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const displayNameIsLengthMin = {
  "displayName": "rubens",
  "email": "rubensJK@gmail.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const emailIsRequired = {
  "displayName": "rubens silva",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const emailIsValid = {
  "displayName": "rubens silva",
  "email": "rubensJK",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const passwordIsRequired = {
  "displayName": "rubens silva",
  "email": "rubensJK@gmail.com",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

const passwordIsLengthMin = {
  "displayName": "rubens silva",
  "email": "rubensJK@gmail.com",
  "password": "12345",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}

describe('User - Sua aplicação deve ter o endpoint POST "/user"', () => {
  beforeEach(() => {
    shell.exec('npm run drop');
    shell.exec('npm run preStart');
  })

  it('1 - Será validado que é possível cadastrar um usuário com sucesso', async () => {
    await frisby
      .post(`${url}/user`, payloadUser)
      .expect('status', 201)
      .then(({json}) => expect(json.token).not.toBeNull());
  })

  it('2 - Será validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres', async () => {
    await frisby
      .post(`${url}/user`, displayNameIsLengthMin)
      .expect('status', 400)
      .then(({json}) => {
        expect(json.message)
        .toBe("\"displayName\" length must be at least 8 characters long");
      });
  });

  it('3 - Será validado que o campo `displayName` é obrigatório', async () => {
    await frisby
      .post(`${url}/user`, displayNameIsRequired)
      .expect('status', 400)
      .then(({json}) => {
        expect(json.message).toBe('\"displayName\" is required');
      });
  });

  it('4 - Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubens`', async () => {
    await frisby
      .post(`${url}/user`, emailIsValid)
      .expect('status', 400)
      .then(({json}) => {
        expect(json.message)
        .toBe('\"email\" must be a valid email');
      });
  });

  it('5 - Será validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`', async () => {
    await frisby
      .post(`${url}/user`, emailIsValid)
      .expect('status', 400)
      .then(({json}) => {
        expect(json.message).toBe('\"email\" must be a valid email');
      });
  });

  it('6 - Será validado que o campo `email` é obrigatório', async () => {
    await frisby
      .post(`${url}/user`, emailIsRequired)
      .expect('status', 400)
      .then(({json}) => {
        expect(json.message).toBe('\"email\" is required');
      });
  });

  it('7 - Será validado que não é possível cadastrar usuário com o campo `password` menor que 6 caracteres', async () => {
    await frisby
      .post(`${url}/user`, passwordIsLengthMin)
      .expect('status', 400)
      .then(({json}) => {
        expect(json.message)
        .toBe('\"password\" length must be at least 6 characters long');
      });
  });

  it('8 - Será validado que o campo `password` é obrigatório', async () => {
    await frisby
    .post(`${url}/user`, passwordIsRequired)
    .expect('status', 400)
    .then(({json}) => {
      expect(json.message).toBe('\"password\" is required');
      });
  });

  it('Validar que não é possível cadastrar um usuário com email já existente', async () => {
    await frisby
      .post(`${url}/user`, payloadUser).expect('status', 201);

    await frisby
      .post(`${url}/user`, payloadUser)
      .expect('status', 409)
      .then(({json}) => {
        expect(json.message).toBe('Usuário já existe');
      });
  });
});
