import type { Knex } from "knex";
import TABLES from "../constants/tables";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLES.USER);
  if (!exists) {
    await knex.schema.createTable(TABLES.USER, (table) => {
      table.uuid("id", {
        primaryKey: true,
        useBinaryUuid: true,
      }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name", 20).notNullable();
      table.timestamps(true, true);
    });
  }
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLES.USER);
};
