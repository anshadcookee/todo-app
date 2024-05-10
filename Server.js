const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/todo_router");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
//connect mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Connected To MongoDB....`))
  .catch((err) => console.log(err));

app.use(routes);
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
