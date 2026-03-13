const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const AuthRoutes = require('./routes/auth');
const TransactionRoutes=require('./routes/transactions');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/transactions",TransactionRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
