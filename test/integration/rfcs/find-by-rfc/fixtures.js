const rfcs = testUtils.generateFixtures({
  type: 'rfc',
  recipe: [
    {
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
});

module.exports = {
  rfcs
};
