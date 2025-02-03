import Dotenv from "dotenv";

Dotenv.config();

const config = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    database: process.env.DATABASE_NAME,
    directory: "./src/scripts",
    tableName: "migrations",
  },
};

export default config;
