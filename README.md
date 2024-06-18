# TrainCoin - a Blockchain deticated to training and education

## What must be included in the project

### For the backend part.

1. Proof of Work // done
2. Block model // done
3. Wallet model // done
4. Blockchain model // done
5. Transaction model // done
6. TransactionPool model // done
7. Connect to peers thru Redis server. // done
8. Block mining rewards // done
9. Protect from double spending // done
10. Write the chain in to a mongodb database // done
11. For a consumer there will be a login function true API with JWT token. // done
12. The consumers will be stored in a mongodb database. // done
13. Register a new user. // done

### For the frontend part.

1. The frontend will be a React app.
2. Create new transactions.
3. Login to the wallet.
4. List transactions.
5. List block and blockchain.
6. Create new block.
7. Register a new user.

## For VG

TODO: Add all the security packages

1. TDD for the transactionhandling.
2. Clean code, SOC, MVC.
3. Protected from DDOS attacks, NoSql injections and XSS attempt.

// wallet will handle login, logout, authicaiton and registration, create transaction, get balance, get public key
// block will handle mine block and only get called by after a number of transactions
// blockchain will handle get blockchain, get block by hash, get block by blocknumber
