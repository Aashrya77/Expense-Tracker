const expenses = require("../model/expenses");

const getAllExpenses = async (req, res) => {
  const { sort } = req.params;

  const expense = await expenses.find({}).sort("-date");
  res.status(200).json({ expense });   
};

const createExpense = async (req, res) => {
  try {
    const expense = await expenses.create(req.body);
    res.status(201).json({ expense });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
  }
};

const getSingleExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expenses.findOne({ _id: id });
  res.status(200).json({ expense });
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expenses.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true
    });
    if(!expense){ 
      return res.status(404).json({msg: 'Expense not found'})
    }
    res.status(200).json({ expense });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: messages });
    }
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expenses.findOneAndDelete({ _id: id });
  res.status(200).json({ msg: "Expense deleted successfully ", expense });
};

module.exports = {
  getAllExpenses,
  createExpense,
  updateExpense,
  getSingleExpense,
  deleteExpense,
};
