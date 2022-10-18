const db = require(".");

async function migrateDatabase() {
  try {
    await db.migrate.latest({ directory: "./src/db/migrations" });
  } catch (error) {
    console.log(error.message);
  }
}

async function truncateDatabase() {
  try {
    // remove foreign key constraints
    await db.raw("SET FOREIGN_KEY_CHECKS = 0");

    await db("users").truncate();
    await db("wallets").truncate();
    await db("transactions").truncate();

    // restore foreign key constraints
    await db.raw("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    console.log(error.message);
  }
}

async function destroyDatabase() {
  try {
    await db.destroy();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { migrateDatabase, truncateDatabase, destroyDatabase };
