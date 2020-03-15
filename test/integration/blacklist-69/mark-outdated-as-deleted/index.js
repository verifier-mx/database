const database = require(`${ROOT_PATH}/lib`);

describe('Database | Blacklist69 store | .markOutdatedAsDeleted', () => {
  const fixtures = require('./fixtures');

  beforeEach(async () => {
    await testUtils.resetDatabase();
    await testUtils.insertFixtures(fixtures);
  });

  it('should set deleted_at date to all records updated equal or before a date', async () => {
    const updatedAt = new Date(1);
    const results = await database.blacklist69.markOutdatedAsDeleted('CANCELADOS', updatedAt);
    expect(results).to.be.equal(3);

    const records = await database.blacklist69.find({type: 'CANCELADOS'});
    records.forEach(item => expectDeletedAt(updatedAt, item));

    const [otherRecord] = await database.blacklist69.find({type: 'NO_LOCALIZADOS'});
    expect(otherRecord.deletedAt).to.be.equal(null);
  });
});

function expectDeletedAt(updatedAt, item) {
  const updateTime = updatedAt.getTime();
  if (item.updatedAt.getTime() <= updateTime) {
    expect(item.deletedAt.getTime()).to.be.closeTo(Date.now(), 10000);
  } else {
    expect(item.deletedAt).to.be.equal(null);
  }
}
