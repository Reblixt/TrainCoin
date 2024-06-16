import { endpoint } from "../config/settings.mjs";
import { blockchain, redisServer, transactionPool } from "../server.mjs";
import { wallet } from "../server.mjs";
import Wallet from "../models/Wallet.mjs";
import Miner from "../models/Miner.mjs";

export const getWalletEndpoints = (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: endpoint.wallet,
  });
};

export const addTransaction = (req, res, next) => {
  const { recipient, amount } = req.body;

  let transaction = transactionPool.transactionExists({
    address: wallet.publicKey,
  });

  try {
    if (transaction) {
      transaction.update({ sender: wallet, recipient, amount });
    } else {
      transaction = wallet.createTransaction({ recipient, amount });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, statusCode: 400, message: error.message });
  }

  transactionPool.addTransaction(transaction);
  redisServer.broadcastTransaction(transaction);
  res.status(201).json({ success: true, statusCode: 201, data: transaction });
};

export const getWalletbalance = (req, res, next) => {
  const address = wallet.publicKey;
  const balance = wallet.calculateBalance({ chain: blockchain, address });

  res.status(200).json({ success: true, statusCode: 200, data: balance });
};

export const getTransactionPool = (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: transactionPool.transactionMap,
  });
};

export const mineTransaction = (req, res, next) => {
  const miner = new Miner({
    blockchain,
    wallet,
    transactionPool,
    redisServer: redisServer,
  });

  miner.mineTransaction();

  res.status(200).json({ success: true, statusCode: 200, data: "Mining..." });
};
