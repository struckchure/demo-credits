/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("first_name");
      table.string("last_name");
      table.string("username").unique().notNullable();
      table.string("password");
      table.string("token").nullable();
      table.timestamps(true, true);
    })
    .createTable("wallets", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("user").index().references("users.id");
      table.float("balance").defaultTo(0);
      table.timestamps(true, true);
    })
    .createTable("transactions", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("wallet").index().references("wallets.id");
      table.float("value").notNullable();
      table.string("type").checkIn(["DEBIT", "CREDIT"]).notNullable();
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("wallets")
    .dropTableIfExists("transactions");
};
