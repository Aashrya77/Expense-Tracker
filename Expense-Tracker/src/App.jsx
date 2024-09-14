import Home from "./Home";
import SingleExpense from "./SingleExpense";
import { Routes, Route } from "react-router-dom";
import {useState, useEffect} from 'react'

function App() {
  const [expenseData, setExpenseData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5500/api/v1/expenses")
      .then((res) => res.json())
      .then((data) => setExpenseData(data.expense));
  }, [expenseData]);

  return (
    <Routes>
      <Route path="/" element={<Home expenseData={expenseData}/>} />
      <Route path="/expense/:id" element={<SingleExpense expenseData={expenseData} setExpenseData={setExpenseData}/>} />
    </Routes>
  );
}

export default App;
