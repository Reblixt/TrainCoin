import { test, expect, beforeEach, describe } from "vitest";
import Wallet from "../../models/Wallet.mjs";
import Transaction from "../../models/Transaction.mjs";
import TransactionPool from "../../models/TransactionPool.mjs";
import Blockchain from "../../models/Blockchain.mjs";

describe("TransactionPool", () => {
  let transactionPool, transaction, sender;
  sender = new Wallet();

  beforeEach(() => {
    transaction = new Transaction({
      sender,
      recipient: "Carl",
      amount: 50,
    });
    transactionPool = new TransactionPool();
  });

  describe("Properties", () => {
    test("should have a transactionMap property", () => {
      expect(transactionPool).toHaveProperty("transactionMap");
    });
  });

  describe("addTransaction()", () => {
    test("should add a transaction to the transaction pool", () => {
      transactionPool.addTransaction(transaction);
      expect(transactionPool.transactionMap[transaction.id]).toEqual(
        transaction,
      );
    });
  });

  describe("transactionExists()", () => {
    test("should return a transaction based on its address", () => {
      transactionPool.addTransaction(transaction);

      expect(
        transactionPool.transactionExists({ address: sender.publicKey }),
      ).toEqual(transaction);
    });
  });

  describe("validTransaction method", () => {
    let transactions;
    beforeEach(() => {
      transactions = [];

      for (let i = 0; i < 10; i++) {
        transaction = new Transaction({
          sender,
          recipient: "Rebecca",
          amount: 50,
        });

        if (i % 3 === 0) {
          transaction.inputMap.amount = 6666;
        } else if (i % 3 === 1) {
          transaction.inputMap.signature = new Wallet().sign("foo");
        } else {
          transactions.push(transaction);
        }

        transactionPool.addTransaction(transaction);
      }
    });
    test("should return valid transactions", () => {
      expect(transactionPool.validateTransactions()).toStrictEqual(
        transactions,
      );
    });
  });

  describe("clearTransactions()", () => {
    test("should clear the transactionPool", () => {
      transactionPool.clearTransactions();
      expect(transactionPool.transactionMap).toEqual({});
    });
  });

  describe("clearBlockTransactions()", () => {
    test("should clear the pool of existing blockchain transactions", () => {
      const blockchain = new Blockchain();
      const expectedTransactionMap = {};

      for (let i = 0; i < 10; i++) {
        const transaction = new Wallet().createTransaction({
          recipient: "Loke",
          amount: 10,
        });

        transactionPool.addTransaction(transaction);

        if (i % 2 === 0) {
          blockchain.addBlock({ data: [transaction] });
        } else {
          expectedTransactionMap[transaction.id] = transaction;
        }
      }

      transactionPool.clearBlockTransactions({ chain: blockchain.chain });

      expect(transactionPool.transactionMap).toEqual(expectedTransactionMap);
    });
  });
});
