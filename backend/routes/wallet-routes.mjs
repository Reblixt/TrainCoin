import express from "express";
import { getWalletEndpoints } from "../controllers/wallet-controller.mjs";

const router = express.Router();

router.get("/", getWalletEndpoints);

export default router;
