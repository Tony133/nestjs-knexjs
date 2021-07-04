import { Knex } from 'knex';

export interface KnexModuleOptions {
  name?: string;
  config: Knex.Config;
  retryAttempts?: number;
  retryDelay?: number;
}
