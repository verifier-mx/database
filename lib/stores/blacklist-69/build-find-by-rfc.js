const RFC_COLUMN = 'rfc';
const DELETED_AT_COLUMN = 'deleted_at';

function buildFindByRfc(knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (rfc, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];

    const results = await knex(tableName)
      .select(...selectArray)
      .where(RFC_COLUMN, rfc)
      .whereNull(DELETED_AT_COLUMN);

    return parseForDelivery(results);
  };
}

module.exports = buildFindByRfc;
