import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rooms/:id/user/:userid (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/rooms/45/user/12345')
      .expect(200)
      .expect('true');
  });

  it('/rooms (POST)', () => {
    return request(app.getHttpServer())
      .post('/rooms')
      .send(
        {
          "name": "mock-name"
        }
      )
      .expect(201)
      .expect('45');
  });

  
  it('/rooms/:id/msg (GET)', () => {
    return request(app.getHttpServer())
      .get('/rooms/45/msg')
      .expect(200)
      .expect([{user:"123",msg:"any message"},{user:"456",msg:"another message"}]);
  });

  it('/rooms/:id/msg (POST)', () => {
    return request(app.getHttpServer())
      .post('/rooms/45/msg')
      .send(
        {
          "user": "12345",
          "msg": "any message"
        }
      )
      .expect(201)
      .expect('true');
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(
        {
          "name": "mock-name",
        }
      )
      .expect(201)
      .expect('12345');
  });
});
