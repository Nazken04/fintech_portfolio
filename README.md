# Payment Processing System

A Node.js-based payment processing application that allows users to register, create an account, view their balance, add funds, and make payments. This system integrates with Stripe for secure payment processing, allowing users to deposit and spend funds within the app.

## Features

- **User Registration & Authentication**: Allows users to register and log in.
- **Account Creation**: Each user can create a unique account with an initial balance of 0.
- **View Balance**: Users can check their current account balance.
- **Add Funds**: Users can deposit funds into their account using Stripe or PayPal.
- **Make Payments**: Users can use their account balance to make payments within the app.
- **Stripe/PayPal Integration**: Securely handle deposits and payments.

## Technologies Used

- **Node.js**: Backend runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database for storing user and account information
- **Stripe**: Payment processor for adding funds
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication middleware

## Installation

1. **Clone the repository**:
   ```bash
   git clone -b payment_processing_system_backend https://github.com/Nazken04/fintech_portfolio.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the project and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key 
   ```

4. **Start the server**:
   ```bash
   npm start
   ```
   The server should be running at `http://localhost:5018`.

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Log in an existing user.

### Account

- **POST /api/accounts/create** - Create a new account for the authenticated user.
- **GET /api/accounts/balance** - Get the account balance for the authenticated user.
- **POST /api/accounts/addbalance** - Add funds to the authenticated user's account.
- **POST /api/payments/pay** - Make a payment from the authenticated user's account.

### Example Usage

1. **Register and log in** to get your authentication token.
2. **Create an account** using your token.
3. **Check your balance**, **add funds**, or **make payments** as needed.

## Development

To run the project in development mode:

```bash
npm run dev
```

This uses `nodemon` for automatic server restarts on file changes.

## Project Structure

```
├── config/
│   └── db.js                # Database connection
├── controllers/
│   ├── authController.js     # Authentication-related functions
│   ├── accountController.js  # Account management functions
│   └── paymentController.js  # Payment processing functions
├── models/
│   ├── User.js               # User schema and model
│   ├── Account.js            # Account schema and model
│   └── Transaction.js        # Transaction schema and model
├── routes/
│   ├── authRoutes.js         # Routes for user authentication
│   ├── accountRoutes.js      # Routes for account management
│   └── paymentRoutes.js      # Routes for payment transactions
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── utils/
│   └── paymentGateway.js     # Stripe/PayPal integration logic
├── .env                      # Environment variables
├── .gitignore                # Ignore node_modules and sensitive files
├── app.js                    # Main Express app setup
└── server.js                 # Entry point for the server
└── README.md
```

## Future Enhancements

- **Withdraw Funds**: Add functionality to allow users to withdraw money.
- **Transaction History**: Track deposits, withdrawals, payments, and transfers.
- **Expanded Payment Options**: Integrate more payment providers beyond Stripe and PayPal.
- **Advanced Error Handling**: Improve error handling and validation.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
