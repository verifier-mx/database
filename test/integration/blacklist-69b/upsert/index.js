const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69b store | .upsert', () => {
  const fixtures = require('./fixtures');
  const [BL69B_1] = fixtures.blacklist69b;

  beforeEach(testUtils.resetDatabase);

  describe('when database is empty', () => {
    it('should insert a new item', async () => {
      const existingItem = await database.blacklist69b.findById(BL69B_1.id);
      expect(existingItem).to.be.equal(null);

      const newItem = await database.blacklist69b.upsert(BL69B_1);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(BL69B_1.id);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
    });
  });

  describe('when object already exists', () => {
    beforeEach(() => testUtils.insertFixtures(fixtures));

    it('should update fields when the object already is stored', async () => {
      const existingItem = await database.blacklist69b.findById(BL69B_1.id);
      expect(existingItem).to.be.an('object');
      expect(existingItem.id).to.be.equal(BL69B_1.id);
      expect(existingItem.updatedAt.getTime()).to.be.equal(0);
      expect(existingItem.deletedAt.getTime()).to.be.equal(0);

      const newStatus = 'favorable';
      const updatedItem = {
        ...BL69B_1,
        status: newStatus,
        deletedAt: null,
        updatedAt: undefined
      };
      const newItem = await database.blacklist69b.upsert(updatedItem);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(BL69B_1.id);
      expect(newItem.status).to.be.equal(newStatus);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
      expect(newItem.deletedAt).to.be.equal(null);
    });
  });
});
