# TrainCoin - a Blockchain deticated to training and education

# Wallet and Blockchain API

## Table of Contents

- [Introduction](#introduction)
- [API Endpoints](#api-endpoints)
  - [Wallet Endpoints](#wallet-endpoints)
  - [Blockchain Endpoints](#blockchain-endpoints)
- [Setup and Installation](#setup-and-installation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Testing the Application](#testing-the-application)

## Introduction

This project provides a set of API endpoints for managing a wallet and interacting with a blockchain. The API includes functionalities such as retrieving wallet details, managing transactions, and mining blocks.

## API Endpoints

### Wallet Endpoints

- **GET /api/v1/wallet**

  - Retrieve wallet details.

- **GET /api/v1/wallet/transactions**

  - Retrieve the transaction pool.

- **GET /api/v1/wallet/mine-transactions**

  - Mine transactions.

- **POST /api/v1/wallet/create-wallet**

  - Register a new user wallet.

- **POST /api/v1/wallet/login**

  - Login user wallet.

- **POST /api/v1/wallet/transaction**
  - (Protected, authorize) Add a new transaction.

### Blockchain Endpoints

- **GET /api/v1/blockchain**

  - Retrieve the entire blockchain.

- **POST /api/v1/block/mine**
  - Mine a new block.

## Setup and Installation

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install the dependencies:
   ```sh
   npm i
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Backend

1. Open a new terminal and navigate to the project root directory.
2. Navigate to the backend directory:
   ```sh
   cd Backend
   ```
3. Install the dependencies:
   ```sh
   npm i
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Testing the Application

After setting up both the frontend and backend, you can start testing the application by accessing the relevant endpoints and verifying the functionality.

# Make sure to have Redis server installed before start the backend node.

## Project Requirements

### Backend Requirements

1. Proof of Work - **done**
2. Block model - **done**
3. Wallet model - **done**
4. Blockchain model - **done**
5. Transaction model - **done**
6. TransactionPool model - **done**
7. Connect to peers through Redis server - **done**
8. Block mining rewards - **done**
9. Protect from double spending - **done**
10. Write the chain into a MongoDB database - **done**
11. Login function for consumers via API with JWT token - **done**
12. Store consumers in a MongoDB database - **done**
13. Register a new user - **done**

### Frontend Requirements

1. The frontend will be a React app - **done**
2. Create new transactions - **done**
3. Login to the wallet - **done**
4. List transactions - **done**
5. List blocks and blockchain - **done**
6. Create new blocks - **done**
7. Register a new user - **done**

## Advanced Features (VG)

1. Test-Driven Development (TDD) for transaction handling.
2. Clean code, Separation of Concerns (SOC), Model-View-Controller (MVC) architecture.
3. Protection from DDOS attacks, NoSQL injections, and XSS attempts.

## Testing the Application

After setting up both the frontend and backend, you can start testing the application by accessing the relevant endpoints and verifying the functionality.
