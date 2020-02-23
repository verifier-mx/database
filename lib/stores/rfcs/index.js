const knex = require('../../engines/postgres');
const buildPostgresStore = require('../../build-store/postgres');
const buildFindValidByRfc = require('./build-find-valid-by-rfc');
const {camelizeObject, snakeObject, snakeArray} = require('../../parsers');

const TABLE_NAME = 'rfcs';
const CONFLICT_TARGETS = ['rfc'];
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
  const findValidByRfc = buildFindValidByRfc(knex, params);

  return {
    ...store,
    findValidByRfc
  };
}

module.exports = buildStore();
