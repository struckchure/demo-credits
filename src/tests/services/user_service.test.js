const { truncateDatabase } = require("../../db/utils");
const userService = require("../../services/user_service");

describe("User Service", () => {
  beforeAll(async () => {
    await truncateDatabase();
  });

  test("can create user", async () => {
    const user = await userService.createUser({
      username: "johndoe",
      password: "123456",
    });

    expect(user.id).toBeDefined();
    expect(user.username).toBe("johndoe");
    expect(user.token).toBeDefined();
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });

  test("can get user", async () => {
    const user = await userService.getUser({ username: "johndoe" });

    expect(user.id).toBeDefined();
    expect(user.username).toBe("johndoe");
    expect(user.token).toBeDefined();
    expect(user.created_at).toBeDefined();
    expect(user.updated_at).toBeDefined();
  });

  test("test user data validation", async () => {
    const validateUserData = (userData) => userService.createUser(userData);

    await expect(validateUserData({ username: "johndoe" })).rejects.toThrow(
      "password is required"
    );
    await expect(validateUserData({ password: "123456" })).rejects.toThrow(
      "username is required"
    );
  });

  test("username is unique", async () => {
    await expect(
      userService.createUser({
        username: "johndoe",
        password: "123456",
      })
    ).rejects.toThrow("user already exists");
  });

  describe("authenticate user", () => {
    test("with right credentials", async () => {
      const user = await userService.authenticateUser({
        username: "johndoe",
        password: "123456",
      });

      expect(user.id).toBeDefined();
      expect(user.username).toBe("johndoe");
      expect(user.token).toBeDefined();
      expect(user.created_at).toBeDefined();
      expect(user.updated_at).toBeDefined();
    });

    test("with wrong username", () => {
      const user = () =>
        userService.authenticateUser({
          username: "wrong username",
          password: "123456",
        });

      expect(user).rejects.toThrow("User not found");
    });

    test("with wrong password", () => {
      const user = () =>
        userService.authenticateUser({
          username: "johndoe",
          password: "wrong password",
        });

      expect(user).rejects.toThrow("Invalid password");
    });
  });
});
