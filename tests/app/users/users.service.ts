import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as Knex from 'knex';
import { InjectModel } from '../../../lib';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const users = await this.knex.table('user_test');
    return { users };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const users = await this.knex.table('user_test').insert({
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Customer ID does not exist');
    }
    const users = await this.knex.table('user_test').where('id', id);
    return { users };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const users = await this.knex.table('user_test').where('id', id).update({
        first_name: updateUserDto.first_name,
        last_name: updateUserDto.last_name,
      });

      return { users };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException('Customer ID does not exist');
    }
    const users = await this.knex.table('user_test').where('id', id).del();
    return { users };
  }
}
