import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppMultiDatabaseModule } from '../src/app-multi-database.module';

describe('Knex', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppMultiDatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
  });

  it(`should start`, async () => {
    await expect(app.init()).resolves.not.toThrow();
  });

  it(`should stop`, async () => {
    await expect(app.close()).resolves.not.toThrow();
  });
});
