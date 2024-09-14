import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleExpense = ({ setExpenseData, expenseData }) => {
  const [singleExpense, setSingleExpense] = useState([]);
  const [expenseValue, setExpenseValue] = useState("");
  const [amountValue, setAmountValue] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5500/api/v1/expenses/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleExpense(data.expense));
  }, [singleExpense]);

  const deleteExpense = async (e) => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v1/expenses/${id}`
      );
      setExpenseData(expenseData.filter((Expense) => Expense._id !== id));

      navigate("/");
    } catch (error) {
      console.error("Deletion Failed", error);
      alert("Error deleting the expense: " + error.message);
    }
  };

  const updateExpense = async (e) => {
    e.preventDefault();
    try {
      const response = axios.patch(
        `http://localhost:5500/api/v1/expenses/${id}`,
        {
          expense: expenseValue,
          amount: amountValue,
        }
      );
    } catch (error) {
      alert("Expense and amount is required");
      console.log(error);
    }
  };
  return (
    <>
      <div className="single">
        <div className="single-heading">
          <h1>Expense</h1>
          <span></span>
        </div>
        <h4>Id: {singleExpense._id}</h4>
        <h4>Name: {singleExpense.expense}</h4>
        <h4>Price: ${singleExpense.amount}</h4>
        <form method="patch" onSubmit={updateExpense}>
          <input
            type="text"
            name="updateName"
            id="updateName"
            placeholder="Enter Expense"
            onChange={(e) => setExpenseValue(e.target.value)}
            required
          />
          <input
            type="number"
            name="updatePrice"
            id="updatePrice"
            placeholder="Enter Price"
            onChange={(e) => setAmountValue(e.target.value)}
            required
          />
          <button>Update</button>
        </form>
        <button
          className="del-btn"
          onClick={() => deleteExpense(singleExpense._id)}
        >
          Delete Expense
        </button>
      </div>
    </>
  );
};

export default SingleExpense;
