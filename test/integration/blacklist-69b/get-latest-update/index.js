const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69b store | .getLatestUpdate', () => {
  const fixtures = require('./fixtures');

  describe('with data', () => {
    beforeEach(async () => {
      await testUtils.resetDatabase();
      await testUtils.insertFixtures(fixtures);
    });

    it('should return the newest updated_at date', async () => {
      const result = await database.blacklist69b.getLatestUpdate();
      expect(result.getTime()).to.be.equal(5);
    });
  });

  describe('when table is empty', () => {
    beforeEach(async () => {
      await testUtils.resetDatabase();
    });

    it('should return null', async () => {
      const result = await database.blacklist69b.getLatestUpdate();
      expect(result).to.be.equal(null);
    });
  });
});
