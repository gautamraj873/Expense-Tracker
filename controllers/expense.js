const Expense = require('../models/expense');

exports.getExpenses = async (req, res) => {
    try{
        const expenseData = await Expense.findAll();
        res.send(expenseData);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch expenses'});
    }
};

exports.createExpenses = async (req, res) => {
    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date;
    try{
        const expenseData = await Expense.create({
            description: description,
            amount: amount,
            category: category,
            date: date
        })
        res.status(201).json({ expense: expenseData });
    }
    catch (error) {
        res.status(400).json({error: 'Failed to create expenses'});
    }
};

exports.getExpenseById = async (req, res) => {
    const expenseId = req.params.id;
    try{
        const expense = await Expense.findByPk(expenseId);
        res.send(expense);
    }
    catch (error) {
        res.status(500).json({error: 'Failed to fetch expenses'});
    }
}

exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
    try{
        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
          return res.status(404).json({ error: 'Expense not found' });
        }
    
        await expense.destroy();
        res.status(200).json({ message: 'Expense deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

exports.updateExpense = async (req, res) => {
    const expenseId = req.params.id;
    const description = req.body.description;
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date; 
    try{
        const expense = await Expense.findByPk(expenseId);
        if(!expense){
            return res.status(404).json({ error: 'Expense not found' });
        }

        expense.description = description;
        expense.amount = amount;
        expense.category = category;
        expense.date = date;

        await expense.save();
        res.status(200).json({ message: 'Expense updated successfully' })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    };
};