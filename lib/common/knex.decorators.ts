import { Inject } from '@nestjs/common';
import { getConnectionToken } from './knex.utils';

export const InjectModel = (connection?: string) => {
  return Inject(getConnectionToken(connection));
};

export const InjectConnection = InjectModel;
