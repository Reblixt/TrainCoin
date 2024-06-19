import express from "express";
import morgan from "morgan";
import Blockchain from "./models/Blockchain.mjs";
import Wallet from "./models/Wallet.mjs";
import walletRouter from "./routes/wallet-routes.mjs";
import blockchainRouter from "./routes/blockchain-routes.mjs";
import blockRouter from "./routes/block-routes.mjs";
import { synchronize } from "./services/nodeServices.mjs";
import { endpoint } from "./config/settings.mjs";
import RedisServer from "./redisServer.mjs";
import TransactionPool from "./models/TransactionPool.mjs";
import { errorHandler } from "./middleware/errorHandler.mjs";

import path from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/mongo.mjs";
import { initializeSecurityServices } from "./services/securityServices.mjs";

connectDb();

export const blockchain = new Blockchain();
export const transactionPool = new TransactionPool();
export const wallet = new Wallet();
export const redisServer = new RedisServer({
  blockchain,
  transactionPool,
  wallet,
});

const fileName = fileURLToPath(import.meta.url);
const dirname = path.dirname(fileName);
global.__appdir = dirname;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

initializeSecurityServices(app);

const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

setTimeout(() => {
  redisServer.broadcast();
}, 1000);

app.use(endpoint.wallet.base, walletRouter);
app.use(endpoint.blockchain, blockchainRouter);
app.use(endpoint.block.base, blockRouter);

app.use(errorHandler);

if (process.env.GENERATE_PEER_PORT === "true") {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    await synchronize(ROOT_NODE);
  }
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
