import express from "express";
import {
  addTransaction,
  getTransactionPool,
  getWalletEndpoints,
  mineTransaction,
} from "../controllers/wallet-controller.mjs";

const router = express.Router();

router.get("/", getWalletEndpoints);
router.get("/transactions", getTransactionPool);
router.get("/mine", mineTransaction);
router.post("/transaction", addTransaction);

export default router;
