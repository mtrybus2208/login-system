export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  env: process.env.NODE_ENV || 'development',
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
