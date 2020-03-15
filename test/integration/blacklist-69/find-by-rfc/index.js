const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69 store | .findByRfc', () => {
  const fixtures = require('./fixtures');
  const [BL69_OK, BL69_DELETED] = fixtures.blacklist69;

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should return empty array when rfc does not match', async () => {
    const result = await database.blacklist69.findByRfc('NON_EXISTENT_RFC');
    expect(result).to.be.eql([]);
  });

  it('should return array with all Blacklist69 matches for existing rfc', async () => {
    const results = await database.blacklist69.findByRfc(BL69_OK.rfc);

    expect(results).to.be.an('array');
    expect(results.length).to.be.equal(1);

    const [result] = results;
    expect(result.id).to.be.equal(BL69_OK.id);
    expect(result.type).to.be.equal(BL69_OK.type);
    expect(result.rfc).to.be.equal(BL69_OK.rfc);
  });

  it('should return empty array when Blacklist69 obj is marked as deleted', async () => {
    const result = await database.blacklist69.findByRfc(BL69_DELETED.rfc);
    expect(result).to.be.eql([]);
  });

  it('should support fields selection', async () => {
    const fields = ['id', 'rfc', 'createdAt'];
    const results = await database.blacklist69.findByRfc(BL69_OK.rfc, {fields});

    expect(results).to.be.an('array');
    expect(results.length).to.be.equal(1);

    const [result] = results;
    expect(result.id).to.be.equal(BL69_OK.id);

    const actualFields = Object.keys(result);
    expect(actualFields).to.be.deep.equal(fields);
  });

  it('should throw error when not sending params', () => {
    return expect(database.blacklist69.findByRfc()).to.be.rejectedWith('Undefined binding(s) detected when compiling SELECT. Undefined column(s): [rfc] query: select * from "blacklist_69" where "rfc" = ? and "deleted_at" is null');
  });
});
