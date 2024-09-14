const express = require('express')
const router = express.Router();
const {getAllExpenses, createExpense, updateExpense, deleteExpense, getSingleExpense} = require('../controllers/expenses')

router.route('/').get(getAllExpenses).post(createExpense)
router.route('/:id').patch(updateExpense).delete(deleteExpense).get(getSingleExpense)

module.exports = router