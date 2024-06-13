import { test, expect, beforeEach, describe } from "vitest";

import Wallet from "../../models/Wallet.mjs";
import { verifySignature } from "../../utilities/crypto-lib.mjs";
import Transaction from "../../models/Transaction.mjs";

describe("Wallet", () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  describe("Properties", () => {
    test("should have a balance Properties", () => {
      expect(wallet).toHaveProperty("balance");
    });
    test("should have a keyPair Properties", () => {
      expect(wallet).toHaveProperty("keyPair");
    });
    test("should have public key Properties", () => {
      expect(wallet).toHaveProperty("publicKey");
    });
  });

  describe("Signing process", () => {
    let data = "test-data";

    test("should verify a signature", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        }),
      ).toBe(true);
    });

    test("should not verify an invalid signature", () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        }),
      );
    });
  });

  describe("createTransaction", () => {
    describe("and the amout is valid", () => {
      let transaction, amount, recipient;

      beforeEach(() => {
        amount = 50;
        recipient = "Carl";
        transaction = wallet.createTransaction({ amount, recipient });
      });
      test("should create a transaction Object", () => {
        expect(transaction).toBeInstanceOf(Transaction);
      });
      test("should math the wallet inputMap", () => {
        expect(transaction.inputMap.address).toEqual(wallet.publicKey);
      });
      test("should output the amount to the recipient", () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
      });
    });
  });
});
