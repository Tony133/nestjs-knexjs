exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        },
        {
          id: 2,
          firstName: 'firstName #2',
          lastName: 'lastName #2',
        },
        {
          id: 3,
          firstName: 'firstName #3',
          lastName: 'lastName #3',
        },
      ]);
    });
};
