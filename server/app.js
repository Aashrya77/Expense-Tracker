require("dotenv").config();
const express = require("express");
require("async-error-handler");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./db/connectDB");

const expenses = require("./Routes/expenses");
//middleware
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/ErrorHandler");
app.use(cors());
app.use(express.json());
app.use("/api/v1/expenses", expenses);       


app.use(notFound);
app.use(errorHandler);
   
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
