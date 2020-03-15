const blacklist69 = testUtils.generateFixtures({
  type: 'blacklist69',
  recipe: [
    { type: 'CANCELADOS', updatedAt: new Date(0), deletedAt: undefined },
    { type: 'CANCELADOS', updatedAt: new Date(1), deletedAt: undefined },
    { type: 'CANCELADOS', updatedAt: new Date(1), deletedAt: undefined },
    { type: 'CANCELADOS', updatedAt: new Date(2), deletedAt: undefined },
    { type: 'CANCELADOS', updatedAt: new Date(3), deletedAt: undefined },
    { type: 'NO_LOCALIZADOS', updatedAt: new Date(0), deletedAt: undefined }
  ]
});

module.exports = {
  blacklist69
};
