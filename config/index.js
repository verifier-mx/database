const {env} = process;

module.exports = {
  getPostgresConfig: () => ({
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASS,
    database: env.POSTGRES_DATABASE
  })
};
