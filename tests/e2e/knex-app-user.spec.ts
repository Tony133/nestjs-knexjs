import { INestApplication, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { UsersModule } from '../src/apps/app-knex/app/users/users.module';
import { KnexModule } from '../../lib';
import * as request from 'supertest';

describe('[Feature] Users - /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        KnexModule.forRoot({
          config: {
            client: 'mysql',
            version: '5.7',
            useNullAsDefault: true,
            connection: {
              host: '127.0.0.1',
              user: 'root',
              port: 3306,
              password: 'root',
              database: 'test',
            },
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new user [POST /users]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(HttpStatus.CREATED)
      .set('Accept', 'application/json')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
      })
      .then(({ body }) => {
        expect(body).toEqual({ users: [1] });
      });
  });

  it('should get all users [GET /users]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .set('Accept', 'application/json')
      .then(({ body }) => {
        expect(body['users']).toEqual([
          {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
          },
        ]);
      });
  });

  it('should get a user by id [GET /users/:id]', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(HttpStatus.OK)
      .set('Accept', 'application/json')
      .then(({ body }) => {
        expect(body['users']).toEqual([
          {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName',
          },
        ]);
      });
  });

  it('should update a user by id [PUT /users/:id]', () => {
    return request(app.getHttpServer())
      .put('/users/1')
      .expect(HttpStatus.OK)
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
      })
      .then(({ body }) => {
        expect(body).toEqual({ users: 1 });
      });
  });

  it('should delete a user by id [DELETE /users/:id]', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
