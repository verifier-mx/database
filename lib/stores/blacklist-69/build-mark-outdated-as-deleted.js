const DELETED_AT_COLUMN = 'deleted_at';
const TYPE_COLUMN = 'type';

module.exports = (knex, params) => {
  const {tableName, updatedAtField} = params;

  return async (type, minimumUpdatedAt) => {
    const results = await knex(tableName)
      .where(TYPE_COLUMN, type)
      .andWhere(updatedAtField, '<=', minimumUpdatedAt)
      .update({ [DELETED_AT_COLUMN]: new Date() });

    return results;
  };
};
