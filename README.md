# Blockchain-based Post Interaction App

This web app allows users to add, comment, and delete posts using **Phantom Wallet** for payments on the **Solana blockchain**. The app integrates cryptocurrency transactions to facilitate post interactions, providing a decentralized, secure, and transparent platform for content creators and users.

---

## Features

- **Add Posts**: Users can create posts by making a payment through Phantom Wallet.
- **Comment on Posts**: Users can leave comments on posts for a fee, processed via Phantom Wallet.
- **Delete Posts**: Users can delete their posts, requiring a payment to be processed on the Solana blockchain.
- **Blockchain-based**: All actions are verified and stored on the Solana blockchain, ensuring immutability and transparency.

---

## Prerequisites

Before running the app, ensure that you have the following tools installed:

- **Node.js** (>= 14.x.x)
- **npm** (Node package manager)
- **Phantom Wallet** browser extension (installed and set up in your browser)
- **Solana Wallet** (with some SOL for transaction fees)

---

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/blockchain-post-interaction-app.git
   cd blockchain-post-interaction-app
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Make sure Phantom Wallet is installed and connected to your browser.

---

## Configuration

To configure the app for your own use or development:

1. Open the project directory and navigate to the `config.js` file.
2. Add your **Solana wallet address** and **network settings** if needed.

---

## Usage

1. Open the application in your browser by running:

   ```bash
   npm start
   ```

2. Connect your **Phantom Wallet** by clicking the **Connect Wallet** button. Approve the connection request in the Phantom Wallet extension.
3. You can now interact with posts on the platform:
   - **Add a post** by clicking **Add Post** and confirming the payment via Phantom Wallet.
   - **Comment on posts** and confirm the transaction using Phantom Wallet.
   - **Delete your posts** by clicking **Delete Post** and approving the transaction.

---

## How It Works

### Phantom Wallet Integration:
- The app connects with the **Phantom Wallet** browser extension to authorize payments. Users need to have **SOL (Solana)** in their wallet to perform actions like adding, commenting, or deleting posts.
- The app communicates with the **Solana blockchain** to process and confirm transactions, ensuring that the posts and comments are permanent and secure.

### Blockchain:
- All post data and transactions are stored on the **Solana blockchain**, making the content tamper-proof and transparent. Actions such as posting and deleting are recorded as transactions on the blockchain.

---

## Running Tests

To run tests, use the following command:

```bash
npm test
```


---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- Thanks to the **Phantom Wallet** team for providing a secure and easy-to-use wallet solution.
- Solana blockchain for providing a fast and scalable platform for decentralized applications.
```
