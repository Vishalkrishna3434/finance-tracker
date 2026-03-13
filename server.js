const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB=require('./config/db');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
connectDB();



app.listen(PORT, () => console.log(`App running on port ${PORT}`));
