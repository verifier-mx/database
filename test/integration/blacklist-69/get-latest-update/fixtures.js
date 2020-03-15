const blacklist69 = testUtils.generateFixtures({
  type: 'blacklist69',
  recipe: [
    { type: 'CANCELADOS', updatedAt: new Date(0) },
    { type: 'CANCELADOS', updatedAt: new Date(1) },
    { type: 'CANCELADOS', updatedAt: new Date(2) },
    { type: 'CANCELADOS', updatedAt: new Date(5) },
    { type: 'CANCELADOS', updatedAt: new Date(1) },
    { type: 'NO_LOCALIZADOS', updatedAt: new Date(100) }
  ]
});

module.exports = {
  blacklist69
};
