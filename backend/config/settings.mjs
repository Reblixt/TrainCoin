export const GENESIS_DATA = {
  timestamp: 1,
  lastHash: "0",
  hash: "0",
  difficulty: 1,
  nonce: 0,
  data: [],
};

export const MINE_RATE = 1000;
export const INITIAL_BALANCE = 1000;
export const REWARD_ADDRESS = { address: "reward-address" };
export const MINING_REWARD = 50;

const createEndpoint = (base, paths = {}) => {
  const endpoint = new Proxy(paths, {
    get(target, prop) {
      if (prop in target) {
        if (typeof target[prop] === "object") {
          return createEndpoint(`${base}${prop}`, target[prop]);
        }
        return `${base}${target[prop]}`;
      }
      return `${base}${prop}`;
    },
  });
  return endpoint;
};

export const endpoint = createEndpoint("/api/v1/", {
  wallet: {
    base: "",
    transaction: "/transaction",
    transactions: "/transactions",
    balance: "/balance",
    publicKey: "/public-key",
    login: "/login",
    createWallet: "/create-wallet",
  },
  block: {
    base: "",
    mine: "/mine",
  },

  blockchain: "blockchain",
});

// wallet will handle login,  authicaiton and registration, create transaction, get balance, get public key
// block will handle mine block and only get called by after a number of transactions
// blockchain will handle get blockchain, get block by hash, get block by blocknumber
