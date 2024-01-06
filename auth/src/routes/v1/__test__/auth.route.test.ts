import request from 'supertest';

import { app } from '../../../app';

// SIGNUP ROUTE
it('returns a 201 status code on successful signup', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 status code with an invalid email', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'testtest.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 status code with an invalid password', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'p',
    })
    .expect(400);
});

it('returns a 400 status code with missing email or password', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({ email: 'test@test.com' })
    .expect(400);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({ password: 'passworD123!' })
    .expect(400);

  await request(app).post('/api/v1/auth/signup').send({}).expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

// SIGNIN ROUTE
it('returns a 400 status code when an uncrecognized email is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 status code when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'wrongPassword',
    })
    .expect(400);
});

it('returns a JWT cookie when supplied with valid credentials', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/v1/auth/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

// SIGNOUT ROUTE
it('clears the JWT cookie after signing out', async () => {
  await request(app)
    .post('/api/v1/auth/signout')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  const response = await request(app)
    .post('/api/v1/auth/signout')
    .send({})
    .expect(200);

  // console.log(response.get('Set-Cookie'));

  expect(response.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
  );
});
