<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Knexjs module for Nest framework (node.js) 😻

## Installation

First install the module via `yarn` or `npm` and do not forget to install the driver package as well:


```bash
    $ npm i --save nest-knexjs knex mysql   # for mysql/mariadb
    $ npm i --save nest-knexjs knex pg      # for postgresql
    $ npm i --save nest-knexjs knex sqlite  # for sqlite
```
or

```bash
    $ yarn add nest-knexjs knex mysql   # for mysql/mariadb
    $ yarn add nest-knexjs knex pg      # for postgresql
    $ yarn add nest-knexjs knex sqlite  # for sqlite
```

## Table of Contents

- [Description](#description)
- [Table of Contents](#table-of-contents)
- [Usage](#usage)
  - [KnexModule](#knexmodule)
  - [ExampleOfUse](#example-of-use)
  - [CreateMigrations](#create-migrations)
  - [RunMigrations](#run-migrations)
  - [CreateSeeds](#create-seeds) 
  - [RunSeeds](#run-seeds)
## Usage

### KnexModule

KnexModule is the primary entry point for this package and can be used synchronously

```typescript
@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        connection: {
          host: '127.0.0.1',
          user: 'root',
          password: 'root',
          database: 'test',
        },
      },
    }),
  ],
})
```
or asynchronously

```typescript
@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'mysql',
          version: '5.7',
          connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'test',
          },
        },
      }),
    }),
  ],
})
```

## Example of use

UsersService:

```typescript
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findAll() {
    const users = await this.knex.table('users');
    return { users };
  }
}
```

UsersController:

```typescript
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getHello() {
    return await this.usersService.findAll();
  }
}
```

## Create Migrations

```bash
  $ npx knex init
  $ npx knex migrate:make [name_migrations]
```

Example file migrations:

```typescript
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id');
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
    })
    .createTable('products', function(table) {
      table.increments('id');
      table.string('name', 255).notNullable();
      table.decimal('price').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('products').dropTable('users');
};
```

## Run Migrations

In `knexfile.js` update with your config settings:

```javascript
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'test',
    },
  },
}
```

then we run the following command from the terminal 

```bash
  $ npx knex migrate:latest 
```

## Create Seeds

```bash
  $ npx knex seed:make [name_seed]
```

Example file seeds

```javascript
exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        { id: 1, first_name: 'firstname1', last_name: 'lastname1' },
        { id: 2, first_name: 'firstname2', last_name: 'lastname2' },
        { id: 3, first_name: 'firstname3', last_name: 'lastname3' },
      ]);
    });
};
```

## Run Seeds

```
  $ npx knex seed:run 
```

For more information on `Knex.js` see [here](http://knexjs.org/)

## Contribute
Feel free to help this library, I'm quite busy with also another Nestjs packages, but the community will appreciate the effort of improving this library. Make sure you follow the guidelines

## Stay in touch

- Author - [Tony133](https://github.com/Tony133)
- Framework - [https://nestjs.com](https://nestjs.com/)

## License

 [MIT licensed](LICENSE)
