const database = require(`${ROOT_PATH}/lib`);

describe('Database | RFCs store | .upsert', () => {
  const fixtures = require('./fixtures');
  const [RFC_1] = fixtures.rfcs;

  beforeEach(testUtils.resetDatabase);

  describe('when database is empty', () => {
    it('should insert a new item', async () => {
      const existingItem = await database.rfcs.findById(RFC_1.id);
      expect(existingItem).to.be.equal(null);

      const newItem = await database.rfcs.upsert(RFC_1);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(RFC_1.id);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
    });
  });

  describe('when object already exists', () => {
    beforeEach(() => testUtils.insertFixtures(fixtures));

    it('should update fields when the object already is stored', async () => {
      const existingItem = await database.rfcs.findById(RFC_1.id);
      expect(existingItem).to.be.an('object');
      expect(existingItem.id).to.be.equal(RFC_1.id);
      expect(existingItem.updatedAt.getTime()).to.be.equal(0);

      const newSatMessage = 'THIS IS A NEW SAT MESSAGE';
      const updatedItem = {
        ...RFC_1,
        satMessage: newSatMessage,
        updatedAt: undefined
      };
      const newItem = await database.rfcs.upsert(updatedItem);
      expect(newItem).to.be.an('object');
      expect(newItem.id).to.be.equal(RFC_1.id);
      expect(newItem.satMessage).to.be.equal(newSatMessage);
      expect(newItem.updatedAt.getTime()).to.be.closeTo(Date.now(), 10000);
    });
  });
});
