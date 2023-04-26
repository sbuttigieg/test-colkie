import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { User } from '../src/entities/user.entity';
import { UsersModule } from '../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user })),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Create User', () => {
    it('/users (POST)', async () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'mock-name',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({ name: 'mock-name' });
        });
    });

    it('/users (POST) => 400 name less than 5 chars', async() => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'mock',
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: 'Bad Request',
            message: ['name: Minimum length is 5 characters'],
            statusCode: 400,
          });
        });
    });

    it('/users (POST) => 400 name more than 30 chars', async() => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'mock-name mock-name mock-name+1',
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: 'Bad Request',
            message: ['name: Maximum length is 30 characters'],
            statusCode: 400,
          });
        });
    });

    it('/users (POST) => 400 name not string', async() => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 123456,
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: 'Bad Request',
            message: [
              'name: Maximum length is 30 characters',
              'name: Minimum length is 5 characters',
              'name must be a string',
            ],
            statusCode: 400,
          });
        });
    });

    it('/users (POST) => 400 name empty', async() => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: '',
        })
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            error: 'Bad Request',
            message: [
              'name: Minimum length is 5 characters',
              'name should not be empty',
            ],
            statusCode: 400,
          });
        });
    });
  });
});
