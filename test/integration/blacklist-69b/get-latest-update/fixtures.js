const blacklist69b = testUtils.generateFixtures({
  type: 'blacklist69b',
  recipe: [
    { updatedAt: new Date(0) },
    { updatedAt: new Date(1) },
    { updatedAt: new Date(2) },
    { updatedAt: new Date(5) },
    { updatedAt: new Date(1) }
  ]
});

module.exports = {
  blacklist69b
};
