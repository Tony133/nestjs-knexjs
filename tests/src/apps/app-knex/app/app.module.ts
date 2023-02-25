import { Module } from '@nestjs/common';
import { KnexModule } from '../../../../../lib';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          port: 3306,
          user: 'root',
          password: 'root',
          database: 'test',
        },
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
