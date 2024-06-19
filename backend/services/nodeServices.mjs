import { endpoint } from "../config/settings.mjs";
import { blockchain, transactionPool } from "../server.mjs";

export const synchronize = async (ROOT_NODE) => {
  let response = await fetch(`${ROOT_NODE}${endpoint.blockchain} `);
  if (response.ok) {
    const result = await response.json();
    blockchain.replaceChain(result.data.chain);
  }

  response = await fetch(`${ROOT_NODE}${endpoint.wallet.transactions}`);
  if (response.ok) {
    const result = await response.json();
    transactionPool.replaceTransactionMap(result.data);
  }
};
