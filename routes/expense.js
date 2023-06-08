const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expense');

// Get all expenses
router.get('/expense', expensesController.getExpenses);

// Create a new expense
router.post('/expense', expensesController.createExpenses);

//Get an expense
router.get('/expense/:id', expensesController.getExpenseById);

// Delete an expense
router.delete('/expense/:id', expensesController.deleteExpense);

// Update an expense
router.put('/expense/:id', expensesController.updateExpense);

module.exports = router;