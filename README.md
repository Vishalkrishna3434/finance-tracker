# Personal Finance Tracker

A full-stack MERN application for tracking personal income and expenses with JWT authentication.

## Features

- JWT authentication with bcrypt password hashing
- Add, view, and delete transactions
- Real-time balance, income, and expense summary
- Transaction history with income/expense categorization
- Protected routes — dashboard accessible only when logged in
- Data persists in MongoDB

## Tech Stack

**Frontend:** React.js, Context API, useReducer, React Router  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT, bcrypt

## Project Structure
```
finance-tracker/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── AuthController.js
│   │   └── TransactionController.js
│   ├── middleware/
│   │   ├── Authentication.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── transaction.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── transactions.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Auth/
        │   │   ├── Login.js
        │   │   └── Register.js
        │   ├── Dashboard/
        │   │   └── Dashboard.js
        │   ├── Layout/
        │   │   └── Navbar.js
        │   └── Transactions/
        │       ├── AddTransaction.js
        │       ├── Balance.js
        │       ├── IncomeExpenses.js
        │       ├── TransactionItem.js
        │       └── TransactionList.js
        ├── context/
        │   ├── AppReducer.js
        │   ├── AuthContext.js
        │   └── TransactionContext.js
        ├── services/
        │   └── api.js
        ├── App.js
        ├── index.js
        └── index.css
```

## API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | /api/auth/register | Register user | Public |
| POST | /api/auth/login | Login user | Public |
| GET | /api/transactions | Get all transactions | Private |
| POST | /api/transactions | Add transaction | Private |
| DELETE | /api/transactions/:id | Delete transaction | Private |
| PUT | /api/transactions/:id | Update transaction | Private |
| GET | /api/transactions/:id | Get single transaction | Private |
| GET | /api/transactions/summary | Get income/expense summary | Private |

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file in `Backend/`:
```
PORT=5000
MONGO_URI=your_mongodb_uri
PROCESS_TOKEN_SECRET=your_jwt_secret
NODE_ENV=DEVELOPMENT
```
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

App runs on `http://localhost:3000`  
API runs on `http://localhost:5000`

## Architecture
```
React Components
      ↓
Context API (AuthContext + TransactionContext + AppReducer)
      ↓
Fetch API (services/api.js)
      ↓
Express REST API (8 endpoints)
      ↓
MongoDB (Mongoose)
```
