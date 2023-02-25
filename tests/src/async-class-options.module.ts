import { Module } from '@nestjs/common';
import { KnexOptionsFactory, KnexModuleOptions, KnexModule } from '../../lib';
import { UsersModule } from './apps/app-knex/app/users/users.module';

class ConfigService implements KnexOptionsFactory {
  createKnexOptions(): KnexModuleOptions {
    return {
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
    };
  }
}

@Module({
  imports: [
    KnexModule.forRootAsync({
      useClass: ConfigService,
    }),
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
    }),
    UsersModule,
  ],
})
export class AsyncOptionsClassModule {}
