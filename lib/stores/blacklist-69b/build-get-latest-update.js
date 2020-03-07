const {get} = require('lodash');

function buildGetLatestUpdate(knex, params) {
  const {tableName, updatedAtField} = params;

  return async () => {
    const results = await knex(tableName).max(updatedAtField);
    return get(results, '0.max') || null;
  };
}

module.exports = buildGetLatestUpdate;
