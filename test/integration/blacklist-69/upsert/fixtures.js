const blacklist69 = testUtils.generateFixtures({
  type: 'blacklist69',
  recipe: [
    {
      reason: 'REASON_1',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      deletedAt: new Date(0)
    }
  ]
});

module.exports = {
  blacklist69
};
