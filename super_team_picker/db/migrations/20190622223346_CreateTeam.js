
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', t => {
    t.bigIncrements('id');
    t.string('name');
    t.string('members');
    t.text('logoUrl');
    t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cohorts')
};
