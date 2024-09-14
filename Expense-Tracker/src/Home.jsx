import React, { useEffect, useState } from "react";
import "./index.css";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from 'date-fns';

const date = new Date(); 
const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');


const Home = ({expenseData}) => {
  
  const [expenseValue, setExpenseValue] = useState("");
  const [priceValue, setPriceValue] = useState(0);


 
  const createExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5500/api/v1/expenses`,
        {
          expense: expenseValue,
          amount: priceValue,
          date: formattedDate
        }
      );

      setExpenseData([...expenseData, response.data.expense]);
      
    } catch (error) {
      
      console.log(error);
    }
    setExpenseValue("");
    setPriceValue();
  };
  const totalAmount = expenseData.reduce((sum, item) => sum + item.amount, 0);
  



  return (
    <>
      <div className="heading">
        <h1>Expense Tracker App</h1>
      </div>
      <div className="container">
        <h1>Expense</h1>
        <form action="" method="post" onSubmit={createExpense}>
          <input
            type="text"
            name="expense"
            id="expense"
            placeholder="Enter Expense"
            onChange={(e) => setExpenseValue(e.target.value)}
            value={expenseValue}
            required
          />
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter Amount"
            onChange={(e) => setPriceValue(e.target.value)}
            value={priceValue}
            required
            min={0}
          />
          <button>Submit</button>
        </form>
      </div>
      <div className="expenses-container">
        <div className="exp-heading">
          <h1>Expenses</h1>
        </div>
        <div className="expenses">
          <div className="headings">
            <h3>Name: </h3>
            <h3>Amount: </h3>
            <h3>Date: </h3>
            <h3></h3>
          </div>
          {expenseData.map((Expense) => {
            return (
              <div className="expense" key={Expense._id}>
                <div className="name">{Expense.expense}</div>
                <div className="amount" style={{color: 'red'}}>{Expense.amount}</div>
                <div className="date">{Expense.date}</div>
                <div className="Edit">
                  <Link to={`/expense/${Expense._id}`}>
                    <FaEdit className="edit" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <footer>
        <h2>Total Expenses:  <span style={{color: 'red'}}>Rs {totalAmount}</span></h2>
      </footer>
    </>
  );
};

export default Home;
