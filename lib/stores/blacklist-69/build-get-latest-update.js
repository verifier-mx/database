const {get} = require('lodash');

const TYPE_COLUMN = 'type';

function buildGetLatestUpdate(knex, params) {
  const {tableName, updatedAtField} = params;

  return async (type) => {
    const results = await knex(tableName).max(updatedAtField).where(TYPE_COLUMN, type);
    return get(results, '0.max') || null;
  };
}

module.exports = buildGetLatestUpdate;
