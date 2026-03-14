const Transaction = require('../models/transaction');
const asyncHandler = require('express-async-handler');

// @desc    Get all transactions for logged in user
// @route   GET /api/transactions
// @access  Private
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
  return res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions
  })
})

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private
const postTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.create({ ...req.body, user: req.user.id });
  return res.status(200).json({
    success: true,
    message: 'Created a Transaction',
    data: transaction
  })
})

// @desc    Get income, expense and balance summary
// @route   GET /api/transactions/summary
// @access  Private
const getTransactionSummary = asyncHandler(async (req, res) => {
  const transaction = await Transaction.find({ user: req.user.id });
  const income = await transaction.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = await transaction.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return res.status(200).json({
    success: true,
    data: {
      income,
      expense,
      balance: income - expense
    }
  })
})

// @desc    Get single transaction by id
// @route   GET /api/transactions/:id
// @access  Private
const getTransactionbyid = asyncHandler(async (req, res) => {
  const transaction = await Transaction.find({ _id: req.params.id, user: req.user.id });
  if (!transaction) return req.status(400).json({
    success: false,
    message: 'Not found'
  })
  return res.status(200).json({
    success: true,
    data: transaction
  })
})

// @desc    Update transaction by id
// @route   PUT /api/transactions/:id
// @access  Private
const putTransactionbyid = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  return res.status(200).json({
    success: true,
    data: transaction
  })
})

// @desc    Delete transaction by id
// @route   DELETE /api/transactions/:id
// @access  Private
const deleteTransaction=asyncHandler(async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  return res.status(200).json({
    success: true,
    data: {}
  })
})

module.exports = {
  getAllTransactions,
  postTransaction,
  getTransactionSummary,
  getTransactionbyid,
  putTransactionbyid,
  deleteTransaction
}