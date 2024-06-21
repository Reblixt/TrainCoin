const base = "http://localhost:5001/api/v1";

export const endpoint = {
  login: `${base}/wallet/login`,
  register: `${base}/wallet/create-wallet`,
  AddTransaction: `${base}/wallet/transaction`,
  GetTransaction: `${base}/wallet/transactions`,
  mineTransaction: `${base}/wallet/mine-transactions`,
  getBlockchain: `${base}/blockchain`,
  mineBlock: `${base}/block/mine`,
};
