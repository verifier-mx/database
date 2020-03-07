const blacklist69b = testUtils.generateFixtures({
  type: 'blacklist69b',
  recipe: [
    { updatedAt: new Date(0), deletedAt: undefined },
    { updatedAt: new Date(1), deletedAt: undefined },
    { updatedAt: new Date(1), deletedAt: undefined },
    { updatedAt: new Date(2), deletedAt: undefined },
    { updatedAt: new Date(3), deletedAt: undefined }
  ]
});

module.exports = {
  blacklist69b
};
