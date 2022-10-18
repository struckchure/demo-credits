const {
  migrateDatabase,
  truncateDatabase,
  destroyDatabase,
} = require("./src/db/utils");

beforeAll(async () => {
  await migrateDatabase();
});

afterAll(async () => {
  await truncateDatabase();
  await destroyDatabase();
});
