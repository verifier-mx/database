const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69 store | .getLatestUpdate', () => {
  const fixtures = require('./fixtures');

  describe('with data', () => {
    beforeEach(async () => {
      await testUtils.resetDatabase();
      await testUtils.insertFixtures(fixtures);
    });

    it('should return the newest updated_at date for specified type', async () => {
      const result = await database.blacklist69.getLatestUpdate('CANCELADOS');
      expect(result.getTime()).to.be.equal(5);
    });

    it('should return null when type doesn\'t match', async () => {
      const result = await database.blacklist69.getLatestUpdate('NON_EXISTENT_TYPE');
      expect(result).to.be.equal(null);
    });

    it('should throw error when not sending type', () => {
      return expect(database.blacklist69.getLatestUpdate()).to.be.rejectedWith('Undefined binding(s) detected when compiling SELECT. Undefined column(s): [type] query: select max("updated_at") from "blacklist_69" where "type" = ?');
    });
  });

  describe('when table is empty', () => {
    beforeEach(async () => {
      await testUtils.resetDatabase();
    });

    it('should return null', async () => {
      const result = await database.blacklist69.getLatestUpdate('CANCELADOS');
      expect(result).to.be.equal(null);
    });
  });
});
