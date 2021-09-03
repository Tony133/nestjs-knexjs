exports.seed = function (knex) {
    return knex('posts')
      .del()
      .then(function () {
        return knex('posts').insert([
          {
            id: 1,
            title: 'title #1',
            description: 'description #1',
          },
          {
            id: 2,
            title: 'title #2',
            description: 'description #2',
          },
          {
            id: 3,
            title: 'title #3',
            description: 'description #3',
          },
        ]);
      });
  };
  