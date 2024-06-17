import express from "express";
import {
  addTransaction,
  getTransactionPool,
  getWalletEndpoints,
  loginUserWallet,
  mineTransaction,
  registerUserWallet,
} from "../controllers/wallet-controller.mjs";

const router = express.Router();

router.get("/", getWalletEndpoints);
router.get("/transactions", getTransactionPool);
router.get("/mine-transactions", mineTransaction);
router.post("/transaction", addTransaction);
router.post("/create-wallet", registerUserWallet);
router.post("/login", loginUserWallet);
export default router;
