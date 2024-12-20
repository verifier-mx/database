const RFC_COLUMN = 'rfc';

function buildFindByRfc(knex, params) {
  const {tableName, parseForDelivery, parseFields, updatedAtField} = params;

  return async (rfc, options = {}) => {
    const {updatedAfter, fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];
    const updatedAfterStr = (updatedAfter || new Date(0)).toISOString();

    const results = await knex(tableName)
      .select(...selectArray)
      .where(RFC_COLUMN, rfc)
      .andWhere(updatedAtField, '>=', updatedAfterStr)
      .first() || null;

    return parseForDelivery(results);
  };
}

module.exports = buildFindByRfc;
