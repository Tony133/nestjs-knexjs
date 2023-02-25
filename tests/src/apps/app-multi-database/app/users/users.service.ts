import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from '../../../../../../lib';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection('db1Connection')
    private knexConnection: Knex,
  ) {}

  async findAll() {
    const users = await this.knexConnection.table('users');
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knexConnection.table('users').insert({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('User ID does not exist');
    }
    const users = await this.knexConnection.table('users').where('id', id);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knexConnection
        .table('users')
        .where('id', id)
        .update({
          firstName: updateUserDto.firstName,
          lastName: updateUserDto.lastName,
        });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException('User ID does not exist');
    }
    const users = await this.knexConnection
      .table('users')
      .where('id', id)
      .del();
    return { users };
  }
}
