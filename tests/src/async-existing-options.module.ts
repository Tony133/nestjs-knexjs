import { Module } from '@nestjs/common';
import { UsersModule } from '../src/apps/app-knex/app/users/users.module';
import { KnexModule } from '../../lib/knex.module';
import { KnexModuleOptions, KnexOptionsFactory } from '../../lib';

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
  providers: [ConfigService],
  exports: [ConfigService],
})
class ConfigModule {}

@Module({
  imports: [
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
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
export class AsyncOptionsExistingModule {}
