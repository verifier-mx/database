const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69 store | .upsert', () => {
  const fixtures = require('./fixtures');
  const [BL69_1] = fixtures.blacklist69;

  beforeEach(testUtils.resetDatabase);

  describe('when database is empty', () => {
    it('should insert a new item', async () => {
      const existingItem = await database.blacklist69.findById(BL69_1.id);
      expect(existingItem).to.be.equal(null);

      const newItem = await database.blacklist69.upsert(BL69_1);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(BL69_1.id);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
    });
  });

  describe('when object already exists', () => {
    beforeEach(() => testUtils.insertFixtures(fixtures));

    it('should update fields when the object already is stored', async () => {
      const existingItem = await database.blacklist69.findById(BL69_1.id);
      expect(existingItem).to.be.an('object');
      expect(existingItem.id).to.be.equal(BL69_1.id);
      expect(existingItem.updatedAt.getTime()).to.be.equal(0);
      expect(existingItem.deletedAt.getTime()).to.be.equal(0);

      const newReason = 'NEW_REASON';
      const updatedItem = {
        ...BL69_1,
        reason: newReason,
        deletedAt: null,
        updatedAt: undefined
      };
      const newItem = await database.blacklist69.upsert(updatedItem);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(BL69_1.id);
      expect(newItem.reason).to.be.equal(newReason);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
      expect(newItem.deletedAt).to.be.equal(null);
    });
  });
});
