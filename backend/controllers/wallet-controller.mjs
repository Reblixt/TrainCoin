import { endpoint } from "../config/settings.mjs";

export const getWalletEndpoints = (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: endpoint.wallet,
  });
};
