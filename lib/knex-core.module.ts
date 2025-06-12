import { Global, Module, DynamicModule, Provider, Type, OnApplicationShutdown, Inject } from '@nestjs/common';
import { KnexModuleAsyncOptions, KnexModuleOptions, KnexOptionsFactory } from './interfaces';
import { getConnectionToken, handleRetry } from './common/knex.utils'
import { KNEX_MODULE_OPTIONS } from './knex.constants';
import { knex, Knex } from 'knex';
import { ModuleRef } from '@nestjs/core';
import { defer, lastValueFrom } from 'rxjs';

@Global()
@Module({})
export class KnexCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(KNEX_MODULE_OPTIONS)
    private readonly options: KnexModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  public static forRoot(options: KnexModuleOptions, connection?: string): DynamicModule {
    if (connection) {
      options.name = connection;
    }

    const knexModuleOptions = {
      provide: KNEX_MODULE_OPTIONS,
      useValue: options,
    };

    const connectionProvider: Provider = {
      provide: getConnectionToken(options.name),
      useFactory: async () => await this.createConnectionFactory(options),
    };

    return {
      module: KnexCoreModule,
      providers: [connectionProvider, knexModuleOptions],
      exports: [connectionProvider],
    };
  }

  public static forRootAsync(options: KnexModuleAsyncOptions, connection: string): DynamicModule {
    if (connection) {
      options.name = connection;
    }

    const connectionProvider: Provider = {
      provide: getConnectionToken(options.name),
      useFactory: async (options: KnexModuleOptions) => {
        return await this.createConnectionFactory(options);
      },
      inject: [KNEX_MODULE_OPTIONS],
    };

    return {
      module: KnexCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), connectionProvider],
      exports: [connectionProvider],
    };
  }

  public async onApplicationShutdown(): Promise<any> {
    const connection = this.moduleRef.get<Knex>(
      getConnectionToken(this.options as KnexModuleOptions) as Type<Knex>,
    );
    connection && (await connection.destroy());
  }

  public static createAsyncProviders(options: KnexModuleAsyncOptions): Provider[] {

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<KnexOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  public static createAsyncOptionsProvider(options: KnexModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: KNEX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // `as Type<KnexOptionsFactory>` is a workaround for microsoft/TypeScript#31603
    const inject = [
      (options.useClass || options.useExisting) as Type<
        KnexOptionsFactory
      >,
    ];

    return {
      provide: KNEX_MODULE_OPTIONS,
      useFactory: async (optionsFactory: KnexOptionsFactory): Promise<KnexModuleOptions> => {
        return await optionsFactory.createKnexOptions();
      },
      inject
    };
  }

  private static async createConnectionFactory(
    options: KnexModuleOptions,
  ): Promise<Knex> {
    return lastValueFrom(
      defer(async () => {
        return knex(options.config);
      }).pipe(handleRetry(options.retryAttempts, options.retryDelay)),
    );
  }

}
