import { test, expect, describe, beforeEach } from "vitest";
import Wallet from "../../models/Wallet.mjs";
import Transaction from "../../models/Transaction.mjs";

describe("Transaction", () => {
  let transaction, sender, recipient, amount;

  beforeEach(() => {
    sender = new Wallet();
    recipient = "Carl";
    amount = 50;
    transaction = new Transaction({ sender, recipient, amount });
  });

  describe("Properties", () => {
    test("should have an id property", () => {
      expect(transaction).toHaveProperty("id");
    });
    test("should have an outputMap property", () => {
      expect(transaction).toHaveProperty("outputMap");
    });
    test("should have an inputMap property", () => {
      expect(transaction).toHaveProperty("inputMap");
    });
  });

  describe("OutputMap", () => {
    test("should output the recipint balance", () => {
      expect(transaction.outputMap[recipient]).toBe(amount);
    });
    test("should display the sender balance", () => {
      expect(transaction.outputMap[sender.publicKey]).toBe(
        sender.balance - amount,
      );
    });
  });
});
