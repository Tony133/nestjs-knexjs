import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { KnexModuleOptions } from './knex-options.interface';
import { KnexOptionsFactory } from './knex-options-factory.interface';

export interface KnexModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    name?: string;
    inject?: any[];
    useClass?: Type<KnexOptionsFactory>;
    useExisting?: Type<KnexOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<KnexModuleOptions> | KnexModuleOptions;
}
  