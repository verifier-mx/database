const TABLE_NAME = 'blacklist_69';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));

    table.string('type').notNullable();
    table.string('rfc').notNullable();
    table.unique(['type', 'rfc']);

    table.string('name');
    table.timestamp('first_publication_date');
    table.timestamp('publication_date');
    table.bigint('amount');
    table.string('state');
    table.string('reason');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
