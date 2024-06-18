import express from "express";
import {
  addTransaction,
  getTransactionPool,
  getWalletEndpoints,
  loginUserWallet,
  mineTransaction,
  registerUserWallet,
} from "../controllers/wallet-controller.mjs";
import { authorize, protect } from "../middleware/authorization.mjs";

const router = express.Router();

router.get("/", getWalletEndpoints);
router.get("/transactions", getTransactionPool);
router.get("/mine-transactions", mineTransaction);
router.post("/create-wallet", registerUserWallet);
router.post("/login", loginUserWallet);
router.post("/transaction", protect, authorize("user"), addTransaction);
export default router;
