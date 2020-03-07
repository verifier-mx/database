function buildFind(knex, params) {
  const {tableName, parseForDelivery, parseFields} = params;

  return async (where = {}, options = {}) => {
    const {fields} = options;
    const selectArray = fields ? parseFields(fields) : ['*'];

    const result = await knex(tableName)
      .select(...selectArray)
      .where(where) || [];

    return parseForDelivery(result);
  };
}

module.exports = buildFind;
