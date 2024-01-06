import request from 'supertest';

import { app } from '../../../app';

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
