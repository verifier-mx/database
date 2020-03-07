const buildFind = require('./build-find');
const buildFindById = require('./build-find-by-id');
const buildUpsert = require('./build-upsert');

function buildPostgresStore(knex, params) {
  return {
    find: buildFind(knex, params),
    findById: buildFindById(knex, params),
    upsert: buildUpsert(knex, params)
  };
}

module.exports = buildPostgresStore;
