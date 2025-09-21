import request, { Response } from 'supertest';
import { CredentialsDto, UserDto } from '../../src/user';
import { aladoServerOptions } from '../../src/config';
import { app } from '../../src/main';

const userInfo: CredentialsDto = {
  email: 'john_doe@example.com',
  password: 'cant_remember',
};

const updatedUserInfo: UserDto = {
  email: 'john_snow@example.com',
};

const apiUrl = `http://localhost:${aladoServerOptions.port}`;

describe('Example API  e2e test suite', () => {
  let bearerToken: string;
  let id: string;

  beforeAll(() => {
    app.start(() => {});
  }, 30000);

  afterAll(() => {
    app.stop(() => {});
  });

  it(`Should allow to sign up`, () => {
    return request(apiUrl)
      .post('/user')
      .set('Accept', 'application/json')
      .send(userInfo)
      .expect(201)
      .then((response: Response) => {
        console.log(response);
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toEqual(userInfo.email);
        id = response.body.id;
      });
  });

  it(`Shouldn't allow to make unauthorized requests`, () => {
    return request(apiUrl)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response: Response) => {
        expect(response.body.message).toBeDefined();
      });
  });

  it(`Should allow to sign in`, () => {
    return request(apiUrl)
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        password: userInfo.password,
        email: userInfo.email,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.token).toBeDefined();
        bearerToken = response.body.token;
      });
  });

  it(`Should allow authorized user to get user`, () => {
    return request(apiUrl)
      .get(`/user/${id}`)
      .set('Accept', 'application/json')
      .set('x-api-key', bearerToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.email).toBeDefined();
      });
  });

  it(`Should allow authorized user to get users list`, () => {
    return request(apiUrl)
      .get(`/user`)
      .set('Accept', 'application/json')
      .set('x-api-key', bearerToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.length).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it(`Should allow authorized user update info`, () => {
    return request(apiUrl)
      .patch(`/user/${id}`)
      .set('Accept', 'application/json')
      .set('x-api-key', bearerToken)
      .send({
        email: updatedUserInfo.email,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.email).toEqual(updatedUserInfo.email);
      });
  });
});
