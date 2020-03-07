const TABLE_NAME = 'blacklist_69b';

exports.up = function(knex) {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('rfc');
    table.unique('rfc');
    table.string('blacklist_id');

    table.string('name');
    table.string('status');

    table.string('alleged_og_id');
    table.timestamp('alleged_og_publication_date');
    table.timestamp('alleged_sat_publication_date');
    table.timestamp('alleged_dof_publication_date');

    table.string('detracted_og_id');
    table.timestamp('detracted_og_publication_date');
    table.timestamp('detracted_sat_publication_date');
    table.timestamp('detracted_dof_publication_date');

    table.string('definitive_og_id');
    table.timestamp('definitive_og_publication_date');
    table.timestamp('definitive_sat_publication_date');
    table.timestamp('definitive_dof_publication_date');

    table.string('favorable_og_id');
    table.timestamp('favorable_og_publication_date');
    table.timestamp('favorable_sat_publication_date');
    table.timestamp('favorable_dof_publication_date');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
