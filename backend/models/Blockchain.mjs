import mongoose from "mongoose";
import { MINING_REWARD, REWARD_ADDRESS } from "../config/settings.mjs";
import { createHash } from "../utilities/crypto-lib.mjs";
import Block from "./Block.mjs";
import Chain from "./BlockchainSchema.mjs";
import ErrorResponse from "./ErrorResponseModel.mjs";
import Transaction from "./Transaction.mjs";

export default class Blockchain {
  constructor() {
    this.chain = [Block.genesis];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({ lastBlock: this.chain.at(-1), data });
    this.chain.push(newBlock);
    this.updateChainInDatabase(this.chain);
    return newBlock;
  }

  replaceChain(chain, shouldValidate, callBack) {
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain must be longer");
      return;
    }
    if (!Blockchain.validateChain(chain)) return;
    if (shouldValidate && !this.validateTransactionData({ chain })) return;

    if (callBack) callBack();
    this.chain = chain;
  }

  validateTransactionData({ chain }) {
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let counter = 0;

      console.log("block.data", block.data);
      for (let transaction of block.data) {
        if (transaction.inputMap.address === REWARD_ADDRESS.address) {
          counter++;
          if (counter > 1) return false;

          if (Object.values(transaction.outputMap)[0] !== MINING_REWARD)
            return false;
        } else {
          if (!Transaction.validate(transaction)) {
            console.error("Invalid transaction");
            return false;
          }

          if (transactionSet.has(transaction)) {
            console.error("An identical transaction appears more than once");
            return false;
          } else {
            transactionSet.add(transaction);
          }
        }
      }
    }
    return true;
  }

  static validateChain(chain) {
    console.log("validatechain", chain);
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, data, nonce, difficulty } =
        chain.at(i);
      const currentLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      if (lastHash !== currentLastHash) {
        console.error("The lastHash must be the same");
        return false;
      }

      if (Math.abs(lastDifficulty - difficulty) > 1) {
        console.log("The difficulty must only adjust by 1");
        return false;
      }

      const validHash = createHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty,
      );
      if (hash !== validHash) return false;
    }
    console.log("validateChain return true");
    return true;
  }

  async updateChainInDatabase(newChain) {
    try {
      await Chain.deleteMany({});
      const chainDoc = new Chain({ chain: newChain });
      const result = await chainDoc.save();

      console.log("Chain updated in the database", result._id);
    } catch (error) {
      throw new ErrorResponse(
        "Error updating the chain in the database",
        500,
        error,
      );
    }
  }

  // async fetchChainFromDatabase() {
  //   try {
  //     const chainDoc = await Chain.findOne({});
  //     if (!chainDoc) {
  //       await this.updateChainInDatabase([Block.genesis]);
  //     } else {
  //       this.chain = chainDoc.chain;
  //     }
  //
  //     console.log("Chain fetched from the database", chainDoc._id);
  //   } catch (error) {
  //     throw new ErrorResponse(
  //       "Error fetching the chain from the database",
  //       500,
  //       error,
  //     );
  //   }
  // }
}
