import express from "express";
import Blockchain from "./models/Blockchain.mjs";
import Wallet from "./models/Wallet.mjs";
import walletRouter from "./routes/wallet-routes.mjs";
import blockchainRouter from "./routes/blockchain-routes.mjs";
import blockRouter from "./routes/block-routes.mjs";
import { synchronize } from "./services/nodeServices.mjs";
import { endpoint } from "./config/settings.mjs";

export const blockchain = new Blockchain();
export const wallet = new Wallet();

const app = express();
app.use(express.json());

const DEFAULT_PORT = 5001;
const ROOT_NODE = `http://localhost:${DEFAULT_PORT}`;

let NODE_PORT;

// setTimeout(() => {
//   redisServer.broadcast();
// }, 1000)

app.use(endpoint.wallet.base, walletRouter);
app.use(endpoint.blockchain, blockchainRouter);
app.use(endpoint.block.base, blockRouter);

if (process.env.GENERATE_PEER_PORT === "true") {
  NODE_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = NODE_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    synchronize(ROOT_NODE); // With await?
  }
});
