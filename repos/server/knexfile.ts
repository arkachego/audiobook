import Dotenv from "dotenv";

Dotenv.config();

const config = {
  client: process.env.DATABASE_CLIENT || 'pg',
  connection: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || 'audiobook',
    user: process.env.DATABASE_USER || 'audiobook',
    password: process.env.DATABASE_PASSWORD || 'audiobook',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    database: process.env.DATABASE_NAME || 'audiobook',
    directory: "./src/scripts",
    tableName: "migrations",
  },
};

export default config;
