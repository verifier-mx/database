const knex = require('../../engines/postgres');
const buildPostgresStore = require('../../build-store/postgres');
const buildFindByRfc = require('./build-find-by-rfc');
const buildGetLatestUpdate = require('./build-get-latest-update');
const buildMarkOutdatedAsDeleted = require('./build-mark-outdated-as-deleted');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'blacklist_69';
const CONFLICT_TARGETS = ['rfc', 'type'];
const UPDATED_AT_FIELD = 'updated_at';

function buildStore() {
  const params = {
    tableName: TABLE_NAME,
    conflictTargets: CONFLICT_TARGETS,
    updatedAtField: UPDATED_AT_FIELD,
    parseForStorage: snakeObject,
    parseForDelivery: camelizeObject,
    parseFields: snakeArray
  };

  const store = buildPostgresStore(knex, params);
  const findByRfc = buildFindByRfc(knex, params);
  const getLatestUpdate = buildGetLatestUpdate(knex, params);
  const markOutdatedAsDeleted = buildMarkOutdatedAsDeleted(knex, params);

  return {
    ...store,
    findByRfc,
    getLatestUpdate,
    markOutdatedAsDeleted
  };
}

module.exports = buildStore();
