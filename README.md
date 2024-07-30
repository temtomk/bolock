# Bolock - Blockchain Project Builder

Bolock is a project builder designed to help you easily construct blockchain projects.

## Getting Started

### 1. Running the Blockchain Node and Deploying Contracts

To run a blockchain node and deploy smart contracts to the local chain, follow these steps:

1. Navigate to the blockchain template directory:
   ```
   cd src/templates/blockchain
   ```

2. Install dependencies:
   ```
    bun install
   ```

3. Run the local Hardhat node:
   ```
   bunx hardhat node
   ```

4. Open a new terminal window, navigate to the same directory, and deploy the contract:
   ```
   bunx hardhat ignition deploy ./ignition/modules/Token.ts --network localhost
   ```

### 2. Running the Server

To run the backend server, follow these steps:

1. Navigate to the server template directory:
   ```
   cd src/templates/server
   ```

2. Install dependencies:
   ```
   bun install
   ```

3. Start the server in development mode:
   ```
   bun run start:dev
   ```

## Important Notes

- Ensure that the blockchain node is running and contracts are deployed before starting the server.
- If you encounter any errors during these steps, verify that all dependencies are correctly installed.

## Contributing

If you'd like to contribute to the project, please send a pull request. All contributions are welcome!