import { endpoint } from "../config/settings.mjs";
import { blockchain, redisServer, transactionPool } from "../server.mjs";
import { wallet } from "../server.mjs";
import Wallet from "../models/Wallet.mjs";
import Miner from "../models/Miner.mjs";
import ErrorResponse from "../models/ErrorResponseModel.mjs";
import ResponseModel from "../models/ResponseModel.mjs";
import User from "../models/UserModel.mjs";
import { asyncHandler } from "../middleware/asyncHandler.mjs";

// @desc Hämta alla wallet endpoints
// @route GET /api/v1/wallet
// @access PUBLIC
export const getWalletEndpoints = (req, res, next) => {
  res.status(200).json(ResponseModel.get("", endpoint.wallet));
  const newWallet = new Wallet();
  console.log("New Wallet", newWallet);
  const publicKey = newWallet.publicKey;
  console.log("Public Key", publicKey);
};

// @desc Skapa en ny transaction
// @route POST /api/v1/wallet/transaction
// @access PRIVATE (only wallet holder)
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
    return next(new ErrorResponse(`Transaction failed: ${error.message}`, 400));
  }

  transactionPool.addTransaction(transaction);
  redisServer.broadcastTransaction(transaction);
  res.status(201).json(ResponseModel.post("", transaction));
};

// @desc Hämta en specifik wallet balansen
// @route GET /api/v1/wallet/transactions
// @access PUBLIC
export const getWalletbalance = (req, res, next) => {
  const address = wallet.publicKey;
  const balance = wallet.calculateBalance({ chain: blockchain, address });

  res.status(200).json(ResponseModel.get("", balance));
};

// @desc Lista alla icke minade transactionerna in i blockkedjan
// @route GET /api/v1/wallet/transactions
// @access PUBLIC
export const getTransactionPool = (req, res, next) => {
  res.status(200).json(ResponseModel.get("", transactionPool.transactionMap));
};

// @desc Minar transactionerna in i blockkedjan
// @route GET /api/v1/wallet/mine-transaction
// @access PRIVATE (only wallet holder)
export const mineTransaction = (req, res, next) => {
  const miner = new Miner({
    blockchain,
    wallet,
    transactionPool,
    redisServer: redisServer,
  });

  miner.mineTransaction();

  res.status(200).json(ResponseModel.get("Mining...", "Mining..."));
};

// @desc Create a new User
// @route POST /api/v1/wallet/register
// @access PUBLIC
// TODO: Add New Wallet creatinon
export const registerUserWallet = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const newWallet = new Wallet().publicKey;
  const wallet = JSON.stringify(newWallet);

  console.log("RegisterForm", name, email, password, wallet, role);
  const userWallet = await User.create({ name, email, password, wallet, role });
  console.log("UserWallet", userWallet);

  createAndSendToken(userWallet, 200, res);
});

// @desc Login User
// @route POST /api/v1/wallet/login
// @access PUBLIC

export const loginUserWallet = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  const isCorrect = await user.validatePassword(password);

  if (!isCorrect) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  createAndSendToken(user, 200, res);
});

const createAndSendToken = (user, statusCode, res) => {
  const token = user.generateToken();

  res.status(statusCode).json({ success: true, statusCode, token });
};
