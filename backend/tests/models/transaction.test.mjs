import { test, expect, describe, beforeEach } from "vitest";
import Wallet from "../../models/Wallet.mjs";
import Transaction from "../../models/Transaction.mjs";
import { verifySignature } from "../../utilities/crypto-lib.mjs";

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

  describe("InputMap", () => {
    describe("Properties inside the inputMap", () => {
      test("should have an timestamp Property", () => {
        expect(transaction.inputMap).toHaveProperty("timestamp");
      });
      test("should have an amount property", () => {
        expect(transaction.inputMap).toHaveProperty("amount");
      });
      test("should have an address property", () => {
        expect(transaction.inputMap).toHaveProperty("address");
      });
      test("should have an signature property", () => {
        expect(transaction.inputMap).toHaveProperty("signature");
      });
      test("should not have outputMap Property", () => {
        expect(transaction.inputMap).not.toHaveProperty("outputMap");
      });
    });

    test("should set the amout to the sender balance", () => {
      expect(transaction.inputMap.amount).toEqual(sender.balance);
    });
    test("should set the addres to the sender pubilc key", () => {
      expect(transaction.inputMap.address).toEqual(sender.publicKey);
    });
    test("should sign the inputMap", () => {
      expect(
        verifySignature({
          publicKey: sender.publicKey,
          data: transaction.outputMap,
          signature: transaction.inputMap.signature,
        }),
      ).toBe(true);
    });
  });

  describe("Validate Transaction", () => {
    test("when the transactios is valid it should return true", () => {
      expect(Transaction.validate(transaction)).toBe(true);
    });
    test("when the transaction is invalid it should return false", () => {
      transaction.outputMap[sender.publicKey] = 5000;
      expect(Transaction.validate(transaction)).toBe(false);
    });
    test("when the transaction is invalid it should return false", () => {
      transaction.inputMap.signature = new Wallet().sign("data");
      expect(Transaction.validate(transaction)).toBe(false);
    });
  });

  describe("Update Transaction", () => {
    let orgSignature, orgSenderOutput, nextRecipient, nextAmount;
    test("should throw an error when the amount exceeds the balance", () => {
      expect(() => {
        transaction.update({ sender, recipient, amount: 5000 });
      }).toThrow("Amount exceeds balance");
    });
    describe("when the amount is valid", () => {
      beforeEach(() => {
        orgSignature = transaction.inputMap.signature;
        orgSenderOutput = transaction.outputMap[sender.publicKey];
        nextAmount = 20;
        nextRecipient = "Alice";

        transaction.update({
          sender,
          recipient: nextRecipient,
          amount: nextAmount,
        });
      });

      test("should display the amount for the next recipient", () => {
        expect(transaction.outputMap[nextRecipient]).toEqual(nextAmount);
      });
      test("should substract the amount from the sender output", () => {
        expect(transaction.outputMap[sender.publicKey]).toEqual(
          orgSenderOutput - nextAmount,
        );
      });

      test("should match the total outpu amout with the inputmap amout", () => {
        expect(
          Object.values(transaction.outputMap).reduce(
            (total, amount) => total + amount,
          ),
        ).toEqual(transaction.inputMap.amount);
      });

      test("should create o new signature", () => {
        expect(transaction.inputMap.signature).not.toEqual(orgSignature);
      });
    });
  });
});
