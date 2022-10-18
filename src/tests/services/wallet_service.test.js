const walletService = require("../../services/wallet_service");
const userService = require("../../services/user_service");
const { truncateDatabase } = require("../../db/utils");

describe("Wallet Service", () => {
  beforeAll(async () => {
    await truncateDatabase();

    // create users
    await userService.createUser({
      username: "user1",
      password: "password",
    });

    await userService.createUser({
      username: "user2",
      password: "password",
    });
  });

  test("can create wallet", async () => {
    const userID = await userService
      .getUser({ username: "user1" })
      .then((user) => user.id);

    const wallet = await walletService
      .createWallet(userID)
      .then((wallet) => wallet);

    expect(wallet).toHaveProperty("id");
    expect(wallet.user).toBe(userID);
    expect(wallet.balance).toBe(0);
    expect(wallet).toHaveProperty("created_at");
    expect(wallet).toHaveProperty("updated_at");
  });

  test("can get wallet", async () => {
    const userID = await userService
      .getUser({ username: "user1" })
      .then((user) => user.id);

    const wallet = await walletService
      .getWallet(userID)
      .then((wallet) => wallet);

    expect(wallet).toHaveProperty("id");
    expect(wallet.user).toBe(userID);
    expect(wallet.balance).toBe(0);
    expect(wallet).toHaveProperty("created_at");
    expect(wallet).toHaveProperty("updated_at");
  });

  test("can fund wallet", async () => {
    const userID = await userService
      .getUser({ username: "user1" })
      .then((user) => user.id);

    const wallet = await walletService
      .fundWallet(userID, 100)
      .then((wallet) => wallet);

    expect(wallet).toHaveProperty("id");
    expect(wallet.user).toBe(userID);
    expect(wallet.balance).toBe(100);
    expect(wallet).toHaveProperty("created_at");
    expect(wallet).toHaveProperty("updated_at");
  });

  test("can transfer from wallet", async () => {
    const wallet = await walletService
      .transferFromWallet(
        {
          senderUsername: "user1",
          receiverUsername: "user2",
        },
        50
      )
      .then((wallet) => wallet);

    expect(wallet.balance).toBe(50);

    const recieverWallet = await walletService
      .getWallet(
        await userService.getUser({ username: "user2" }).then((user) => user.id)
      )
      .then((wallet) => wallet);

    expect(recieverWallet.balance).toBe(50);
  });

  test("can withdraw from wallet", async () => {
    const userID = await userService
      .getUser({ username: "user1" })
      .then((user) => user.id);

    const wallet = await walletService
      .withdrawFromWallet(
        {
          userID,
        },
        50
      )
      .then((wallet) => wallet);

    expect(wallet).toHaveProperty("id");
    expect(wallet.user).toBe(user1ID);
    expect(wallet.balance).toBe(0);
    expect(wallet).toHaveProperty("created_at");
    expect(wallet).toHaveProperty("updated_at");
  });
});
