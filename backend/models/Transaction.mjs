import { v4 as uuidv4 } from "uuid";
import { verifySignature } from "../utilities/crypto-lib.mjs";
import { MINING_REWARD, REWARD_ADDRESS } from "../config/settings.mjs";

export default class Transaction {
  constructor({ sender, recipient, amount, inputMap, outputMap }) {
    this.id = uuidv4().replaceAll("-", "");
    this.outputMap = outputMap || this.createMap({ sender, recipient, amount });
    this.inputMap =
      inputMap || this.createInputMap({ sender, outputMap: this.outputMap });
  }

  static validate(transaction) {
    const {
      inputMap: { address, amount, signature },
      outputMap,
    } = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total, amount) => total + amount,
    );

    if (amount !== outputTotal) return false;

    if (!verifySignature({ publicKey: address, data: outputMap, signature }))
      return false;

    return true;
  }

  static transactionReward({ minerWallet }) {
    return new this({
      inputMap: REWARD_ADDRESS,
      outputMap: { [minerWallet.publicKey]: MINING_REWARD },
    });
  }

  update({ sender, recipient, amount }) {
    if (amount > this.outputMap[sender.publicKey]) {
      throw new Error("Amount exceeds balance");
    }
    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] += amount;
    }

    this.outputMap[sender.publicKey] -= amount;

    this.inputMap = this.createInputMap({ sender, outputMap: this.outputMap });
  }

  createMap({ sender, recipient, amount }) {
    const outputMap = {};

    outputMap[recipient] = amount;
    outputMap[sender.publicKey] = sender.balance - amount;

    return outputMap;
  }

  createInputMap({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }
}
