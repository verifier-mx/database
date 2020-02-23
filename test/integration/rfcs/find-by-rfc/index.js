const database = require(`${ROOT_PATH}/lib`);

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

describe('Database | RFCs store | .findByRfc', () => {
  const fixtures = require('./fixtures');
  const [RFC_1] = fixtures.rfcs;

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should return null when rfc does not match', async () => {
    const rfc = await database.rfcs.findByRfc('NON_EXISTENT_RFC');
    expect(rfc).to.be.equal(null);
  });

  it('should return RFC obj when rfc matches', async () => {
    const rfc = await database.rfcs.findByRfc(RFC_1.rfc);

    expect(rfc).to.be.an('object');
    expect(rfc.id).to.be.equal(RFC_1.id);
    expect(rfc.rfc).to.be.equal(RFC_1.rfc);
  });

  it('should return RFC when rfc matches and updatedAt option is after updatedAfter', async () => {
    const updatedAfter = new Date(Date.now() - ONE_DAY_IN_MS);
    const rfc = await database.rfcs.findByRfc(RFC_1.rfc, { updatedAfter });

    expect(rfc).to.be.an('object');
    expect(rfc.id).to.be.equal(RFC_1.id);
    expect(rfc.rfc).to.be.equal(RFC_1.rfc);
    expect(rfc.updatedAt.getTime() > updatedAfter.getTime()).to.be.equal(true);
  });

  it('should return null when rfc matches but updatedAt option is before updatedAfter', async () => {
    const updatedAfter = new Date(Date.now() + ONE_DAY_IN_MS);
    const rfc = await database.rfcs.findByRfc(RFC_1.rfc, { updatedAfter });

    expect(rfc).to.be.equal(null);
  });

  it('should support fields selection', async () => {
    const fields = ['id', 'rfc'];
    const rfc = await database.rfcs.findByRfc(RFC_1.rfc, {fields});

    expect(rfc).to.be.an('object');
    expect(rfc.id).to.be.equal(RFC_1.id);

    const actualFields = Object.keys(rfc);
    expect(actualFields).to.be.deep.equal(fields);
  });

  it('should throw error when not sending an id', () => {
    return expect(database.rfcs.findByRfc()).to.be.rejectedWith('Undefined binding(s) detected when compiling FIRST. Undefined column(s): [rfc] query: select * from "rfcs" where "rfc" = ? and "updated_at" >= ? limit ?');
  });

  describe('Returning null', () => {
    const NULL_TEST_CASES = ['NOT_EXISTENT_ID', null, true, 0];

    NULL_TEST_CASES.forEach(testCase => {
      it(`should return null when no place exist with an id (${testCase})`, async () => {
        const result = await database.rfcs.findByRfc(testCase);
        expect(result).to.be.equal(null);
      });
    });
  });
});
