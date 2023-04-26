import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { Message } from '../src/entities/msg.entity';
import { Room } from '../src/entities/room.entity';
import { User } from '../src/entities/user.entity';
import { RoomsModule } from '../src/rooms/rooms.module';

describe('RoomsController (e2e)', () => {
  let app: INestApplication;

  const mockMessagesRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValueOnce(
        [{
          id: '7d096d89-b923-4b42-a68e-01a778eecf16',
          content: 'mock-message',
        }],
      ),
    })),
    save: jest.fn().mockImplementation((message) => Promise.resolve({ ...message })),
  };
  
  const mockRoomsRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    findOneOrFail: jest.fn().mockImplementation((room) =>
      Promise.resolve({
        id: '7d096d89-b923-4b42-a68e-01a778eecf16',
        users: [],
        ...room,
      }),
    ),
    save: jest.fn().mockImplementation((room) => Promise.resolve({ ...room })),
  };

  const mockUsersRepository = {
    findOneOrFail: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        lastLogin: new Date('2023-04-21'),
        ...user,
      }),
    ),
    save: jest.fn().mockImplementation((user) => Promise.resolve({ ...user })),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RoomsModule],
    })
      .overrideProvider(getRepositoryToken(Message))
      .useValue(mockMessagesRepository)
      .overrideProvider(getRepositoryToken(Room))
      .useValue(mockRoomsRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Add user to Room', () => {
    it('/rooms/user (POST)',() => {
      return request(app.getHttpServer())
        .post('/rooms/user')
        .send({
          room: '7d096d89-b923-4b42-a68e-01a778eecf16',
          user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        })
        .expect(201)
        .expect('true');
    });
  });

  describe('Create Room', () => {
    it('/rooms (POST)', async () => {
      return request(app.getHttpServer())
        .post('/rooms')
        .send({
          name: 'mock-name',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({ name: 'mock-name' });
        });
    });
  
    it('/rooms (POST) => 400 name less than 5 chars', async() => {
      return request(app.getHttpServer())
        .post('/rooms')
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

    it('/rooms (POST) => 400 name more than 30 chars', async() => {
      return request(app.getHttpServer())
        .post('/rooms')
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

    it('/rooms (POST) => 400 name not string', async() => {
      return request(app.getHttpServer())
        .post('/rooms')
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

    it('/rooms (POST) => 400 name empty', async() => {
      return request(app.getHttpServer())
        .post('/rooms')
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

  describe('Get latest messages from a room', () => {
    it('/rooms/:id/msg (GET)',() => {
      return request(app.getHttpServer())
        .get('/rooms/7d096d89-b923-4b42-a68e-01a778eecf16/msg?user=470c5100-e087-4245-9ccc-2f719e7bc11e')
        .expect(200)
        .expect('[{"id":"7d096d89-b923-4b42-a68e-01a778eecf16","content":"mock-message"}]');
    });
  });

  describe('Send msg to room', () => {
    it('/rooms/msg (POST)',() => {
      return request(app.getHttpServer())
        .post('/rooms/msg')
        .send({
          room: '7d096d89-b923-4b42-a68e-01a778eecf16',
          user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
          content: 'any message',
        })
        .expect(201)
        .expect('true');
    });
  });
});
