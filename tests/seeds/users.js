exports.seed = function (knex) {
  return knex('user')
    .del()
    .then(function () {
      return knex('user').insert([
        {
          id: 1,
          first_name: 'firstName #1',
          last_name: 'lastName #1',
        },
        {
          id: 2,
          first_name: 'firstName #1',
          last_name: 'lastName #1',
        },
        {
          id: 3,
          first_name: 'firstName #1',
          last_name: 'lastName #1',
        },
      ]);
    });
};
