import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { NotFoundException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from '../../../../lib';

@Injectable()
export class PostService {
  constructor(
    @InjectConnection('db2Connection')
    private knexConnection: Knex,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const post = await this.knexConnection.table('posts').insert({
        title: createPostDto.title,
        description: createPostDto.description,
      });

      return post;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const posts = await this.knexConnection.table('posts');
    return { posts };
  }

  async findOne(id: number) {
    if (!id) {
      throw new NotFoundException('Post ID does not exist');
    }
    const posts = await this.knexConnection.table('posts').where('id', id);
    return { posts };
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const posts = await this.knexConnection
        .table('posts')
        .where('id', id)
        .update({
          title: updatePostDto.title,
          description: updatePostDto.description,
        });

      return { posts };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    if (!id) {
      throw new NotFoundException('Post ID does not exist');
    }
    const post = await this.knexConnection.table('posts').where('id', id).del();
    return { post };
  }
}
