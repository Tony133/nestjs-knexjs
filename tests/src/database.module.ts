import { DynamicModule, Module } from '@nestjs/common';
import { KnexModule } from '../../lib';

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      module: DatabaseModule,
      imports: [
        KnexModule.forRoot(
          {
            name: 'db1Connection',
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
          },
          'db1Connection',
        ),
        KnexModule.forRoot(
          {
            name: 'db2Connection',
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
          },
          'db2Connection',
        ),
      ],
    };
  }
}
