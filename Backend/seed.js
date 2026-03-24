const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('./models/transaction');
const User = require('./models/user');

dotenv.config();

const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Rent', 'Salary', 'Freelance'];

const getRandomAmount = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  // Find your user (register once manually first, then run this)
  const user = await User.findOne();
  if (!user) {
    console.log('No user found. Register once via the app first, then run this.');
    process.exit(1);
  }

  console.log(`Seeding for user: ${user.email}`);

  // Clear existing transactions for this user
  await Transaction.deleteMany({ user: user._id });

  const transactions = [];

  // 25 income transactions
  const incomeTitles = ['Salary', 'Freelance Payment', 'Bonus', 'Part-time Work', 'Refund'];
  for (let i = 0; i < 25; i++) {
    transactions.push({
      user: user._id,
      title: incomeTitles[i % incomeTitles.length],
      amount: getRandomAmount(500, 5000),
      type: 'income',
      category: i % 2 === 0 ? 'Salary' : 'Freelance',
      date: getRandomDate(new Date('2025-01-01'), new Date('2026-03-01'))
    });
  }

  // 25 expense transactions
  const expenseTitles = ['Groceries', 'Bus Pass', 'Netflix', 'Dinner Out', 'Medicine', 'Books', 'Electricity Bill', 'Rent'];
  for (let i = 0; i < 25; i++) {
    transactions.push({
      user: user._id,
      title: expenseTitles[i % expenseTitles.length],
      amount: getRandomAmount(50, 2000),
      type: 'expense',
      category: categories[i % categories.length],
      date: getRandomDate(new Date('2025-01-01'), new Date('2026-03-01'))
    });
  }

  await Transaction.insertMany(transactions);
  console.log('50 transactions seeded successfully');
  process.exit(0);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});