import Transaction from "./Transaction.mjs";

export default class Miner {
  constructor({ blockchain, wallet, transactionPool, redisServer }) {
    this.blockchain = blockchain;
    this.wallet = wallet;
    this.transactionPool = transactionPool;
    this.redisServer = redisServer;
  }

  mineTransaction() {
    const validTransactions = this.transactionPool.validateTransactions();
    validTransactions.push(
      Transaction.transactionReward({ miner: this.wallet }),
    );
    this.blockchain.addBlock({ data: validTransactions });
    this.redisServer.broadcast();
    this.transactionPool.clearTransactions();
  }
}
