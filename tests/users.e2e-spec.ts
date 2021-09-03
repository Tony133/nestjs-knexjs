import { INestApplication, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { UsersModule } from './app-multi-database/app/users/users.module';
import { KnexModule } from '../lib';
import * as request from 'supertest';

describe('[Feature] Users - /users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        KnexModule.forRootAsync(
          {
            useFactory: () => ({
              config: {
                client: 'mysql',
                version: '5.7',
                useNullAsDefault: true,
                connection: {
                  host: '127.0.0.1',
                  user: 'root',
                  port: 3306,
                  password: 'root',
                  database: 'test1',
                },
                pool: {
                  min: 2,
                  max: 10,
                },
              },
            }),
          },
          'db1Connection',
        ),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(HttpStatus.CREATED)
      .set('Accept', 'application/json')
      .send({
        firstName: 'firstName',
        lastName: 'lastName',
      })
      .then((res) => {
        res.body;
      });
  });

  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .set('Accept', 'application/json')
      .then(({ body }) => {
        expect(body['users']).toEqual([
          {
            id: 1,
            firstName: 'firstName #1',
            lastName: 'lastName #1',
          },
          {
            id: 2,
            firstName: 'firstName #1',
            lastName: 'lastName #1',
          },
          {
            id: 3,
            firstName: 'firstName #1',
            lastName: 'lastName #1',
          },
          {
            id: 4,
            firstName: 'firstName',
            lastName: 'lastName',
          },
        ]);
      });
  });

  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer())
      .get('/users/2')
      .expect(HttpStatus.OK)
      .set('Accept', 'application/json')
      .then(({ body }) => {
        expect(body['users']).toEqual([
          {
            id: 2,
            firstName: 'firstName #1',
            lastName: 'lastName #1',
          },
        ]);
      });
  });

  it('Update one [PUT /:id]', () => {
    return request(app.getHttpServer())
      .put('/users/2')
      .expect(HttpStatus.OK)
      .send({
        firstName: 'firstName update',
        lastName: 'lastName update',
      })
      .then((res) => {
        res.body;
      });
  });

  it('Delete one [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
