import { INestApplication, HttpStatus } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { UsersModule } from './app/users/users.module';
import { KnexModule } from '../lib';
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

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        first_name: 'firstName1',
        last_name: 'lastName1',
      })
      .then(({ body }) => {
        expect(body).toEqual({
          first_name: 'firstName1',
          last_name: 'lastName1',
        });
      });
  });

  it('Get all [GET /]', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body["users"]).toEqual([{
            first_name: 'firstName1',
            last_name: 'lastName1',
        }]);
      });  
  });

  it('Get one [GET /:id]', () => {
    return request(app.getHttpServer())
      .get('/users/2')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body["users"]).toEqual({
          id: 2,
          first_name: 'firstName2',
          last_name: 'lastName2',
        });
      });  
  });

  it('Delete one [DELETE /:id]', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
