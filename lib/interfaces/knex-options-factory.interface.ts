import { KnexModuleOptions } from './knex-options.interface';

export interface KnexOptionsFactory {
    createKnexOptions(connectionName?: string): Promise<KnexModuleOptions> | KnexModuleOptions;
}
  