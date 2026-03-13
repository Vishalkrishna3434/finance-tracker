const express = require('express');
const router = express.Router();
const protect = require('../middleware/Authentication');
const { getAllTransactions, postTransaction, getTransactionSummary, getTransactionbyid, putTransactionbyid, deleteTransaction } = require('../controllers/TransactionController');

router.route("/")
  .get(protect, getAllTransactions)
  .post(protect, postTransaction);

router.get("/summary", protect, getTransactionSummary);

router.route("/:id")
  .get(protect, getTransactionbyid)
  .put(protect, putTransactionbyid)
  .delete(protect, deleteTransaction);

module.exports = router;