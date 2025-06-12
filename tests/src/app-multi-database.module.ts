import { Module } from '@nestjs/common';
import { KnexModule } from '../../lib';

@Module({
  imports: [
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
        pool: {
          min: 2,
          max: 10,
        },
      },
    }, "dbTestConnection1"),
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
        pool: {
          min: 2,
          max: 10,
        },
      },
    }, "dbTestConnection2"),
  ],
})
export class AppMultiDatabaseModule {}
