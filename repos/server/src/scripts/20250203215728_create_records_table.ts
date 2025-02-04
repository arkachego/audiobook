import type { Knex } from "knex";
import TABLES from "../constants/tables";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable(TABLES.RECORD);
  if (!exists) {
    await knex.schema.createTable(TABLES.RECORD, (table) => {
      table.uuid("id", {
        primaryKey: true,
        useBinaryUuid: true,
      }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("name", 50).notNullable();
      table.string("link", 250).notNullable();
      table.uuid("user_id").notNullable().references("id").inTable(TABLES.USER);
      table.timestamps(true, true);
    });
  }
};

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(TABLES.RECORD);
};
