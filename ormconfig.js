module.exports = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrationsTableName: 'migration',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
  synchronize: false,
  autoLoadEntities: true,
  ssl: { rejectUnauthorized: false },
};
