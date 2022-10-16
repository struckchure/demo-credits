const db = require(".");

async function migrateDatabase() {
  await db.migrate.latest({ directory: "./src/db/migrations" });
}

async function rollbackDatabase() {
  // remove foreign key constraints
  await db.raw("SET FOREIGN_KEY_CHECKS = 0");

  await db.migrate.rollback({ directory: "./src/db/migrations" });

  // restore foreign key constraints
  await db.raw("SET FOREIGN_KEY_CHECKS = 1");
}

async function destroyDatabase() {
  await db.destroy();
}

module.exports = { migrateDatabase, rollbackDatabase, destroyDatabase };
