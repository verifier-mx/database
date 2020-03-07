const DELETED_AT_COLUMN = 'deleted_at';

module.exports = (knex, params) => {
  const {tableName, updatedAtField} = params;

  return async (minimumUpdatedAt) => {
    const results = await knex(tableName)
      .where(updatedAtField, '<=', minimumUpdatedAt)
      .update({ [DELETED_AT_COLUMN]: new Date() });

    return results;
  };
};
