import { Module } from '@nestjs/common';
import { KnexModule } from '../../../lib';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
              port: 3307,
              password: 'root',
              database: 'test2',
            },
            pool: {
              min: 2,
              max: 10,
            },
          },
        }),
      },
      'db2Connection',
    ),

    UsersModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
