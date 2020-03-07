const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69b store | .findByRfc', () => {
  const fixtures = require('./fixtures');
  const [BL69B_OK, BL69B_DELETED] = fixtures.blacklist69b;

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should return null when rfc does not match', async () => {
    const result = await database.blacklist69b.findByRfc('NON_EXISTENT_RFC');
    expect(result).to.be.equal(null);
  });

  it('should return Blacklist69b obj when rfc matches', async () => {
    const result = await database.blacklist69b.findByRfc(BL69B_OK.rfc);

    expect(result).to.be.an('object');
    expect(result.id).to.be.equal(BL69B_OK.id);
    expect(result.rfc).to.be.equal(BL69B_OK.rfc);
  });

  it('should return null when Blacklist69b obj is marked as deleted', async () => {
    const result = await database.blacklist69b.findByRfc(BL69B_DELETED.rfc);
    expect(result).to.be.equal(null);
  });

  it('should support fields selection', async () => {
    const fields = ['id', 'rfc'];
    const result = await database.blacklist69b.findByRfc(BL69B_OK.rfc, {fields});

    expect(result).to.be.an('object');
    expect(result.id).to.be.equal(BL69B_OK.id);

    const actualFields = Object.keys(result);
    expect(actualFields).to.be.deep.equal(fields);
  });

  it('should throw error when not sending an id', () => {
    return expect(database.blacklist69b.findByRfc()).to.be.rejectedWith('Undefined binding(s) detected when compiling FIRST. Undefined column(s): [rfc] query: select * from "blacklist_69b" where "rfc" = ? and "deleted_at" is null limit ?');
  });

  describe('Returning null', () => {
    const NULL_TEST_CASES = ['NOT_EXISTENT_ID', null, true, 0];

    NULL_TEST_CASES.forEach(testCase => {
      it(`should return null when no place exist with an id (${testCase})`, async () => {
        const result = await database.blacklist69b.findByRfc(testCase);
        expect(result).to.be.equal(null);
      });
    });
  });
});
