const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB=require('./config/db');
const PORT = process.env.PORT || 5000;
const AuthRoutes=require('./routes/auth');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth",AuthRoutes);

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
