exports.seed = function (knex) {
  return knex('user')
    .del()
    .then(function () {
      return knex('user').insert([
        {
          id: 1,
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        },
        {
          id: 2,
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        },
        {
          id: 3,
          firstName: 'firstName #1',
          lastName: 'lastName #1',
        },
      ]);
    });
};
