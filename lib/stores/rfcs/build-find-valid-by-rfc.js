const RFC_COLUMN = 'rfc';

function buildFindValidByRfc(knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (rfc, updatedAfter, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];
    const updatedAfterStr = updatedAfter ? updatedAfter.toISOString() : null;

    const results = await knex(tableName)
      .select(...selectArray)
      .where(RFC_COLUMN, rfc)
      .andWhere('updated_at', '>', updatedAfterStr)
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindValidByRfc;
