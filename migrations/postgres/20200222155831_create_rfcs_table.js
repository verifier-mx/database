const TABLE_NAME = 'rfcs';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('rfc').notNullable();
    table.unique('rfc');

    table.string('type');
    table.string('sat_message');
    table.boolean('is_valid');
    table.boolean('is_registered');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
