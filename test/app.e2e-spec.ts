import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
// import { AppModule } from './../src/app.module';
import { RoomsController } from './../src/rooms/rooms.controller';
import { RoomsService } from './../src/rooms/rooms.service';
import { UsersController } from './../src/users/users.controller';
import { UsersService } from './../src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [RoomsController, UsersController],
      providers: [RoomsService, UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rooms/:id/user/:userid (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(
        '/rooms/7d096d89-b923-4b42-a68e-01a778eecf16/user/470c5100-e087-4245-9ccc-2f719e7bc11e',
      )
      .expect(200)
      .expect('true');
  });

  it('/rooms (POST)', () => {
    return request(app.getHttpServer())
      .post('/rooms')
      .send({
        name: 'mock-name',
      })
      .expect(201)
      .expect('7d096d89-b923-4b42-a68e-01a778eecf16');
  });

  it('/rooms/:id/msg (GET)', () => {
    return request(app.getHttpServer())
      .get('/rooms/7d096d89-b923-4b42-a68e-01a778eecf16/msg')
      .expect(200)
      .expect([
        {
          user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
          content: 'any message',
        },
      ]);
  });

  it('/rooms/msg (POST)', () => {
    return request(app.getHttpServer())
      .post('/rooms/msg')
      .send({
        user: '470c5100-e087-4245-9ccc-2f719e7bc11e',
        room: '7d096d89-b923-4b42-a68e-01a778eecf16',
        content: 'any message',
      })
      .expect(201)
      .expect('true');
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'mock-name',
      })
      .expect(201)
      .expect('470c5100-e087-4245-9ccc-2f719e7bc11e');
  });
});
