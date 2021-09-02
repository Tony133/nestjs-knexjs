import { Inject } from '@nestjs/common';
import { KnexModuleOptions } from '../interfaces/knex-options.interface';
import { getConnectionToken } from './knex.utils';

export const InjectModel = (connection?: string) => {
  return Inject(getConnectionToken(connection));
};

export const InjectConnection: (
  connection?: KnexModuleOptions | string,
) => ParameterDecorator = (connection?: KnexModuleOptions | string) =>
  Inject(getConnectionToken(connection));
