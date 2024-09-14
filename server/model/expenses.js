const mongoose = require("mongoose");


const expensesSchema = new mongoose.Schema({
  expense: {
    type: String,
    required: [true, "Expense must be provided"],
  },
  amount: { 
    type: Number,
    required: [true, "Amount must be provided"],  
  },
  date: {
    type: Date,  
   
  }    
}); 

module.exports = mongoose.model("Expenses", expensesSchema);
