const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/index");
const cors = require("cors");
const router = require("./routes/index");
const path = require('path');

const hbs = require('hbs');

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.get('/test', (req, res) => {
  res.render('index', {
    title: 'Home',
    message: 'Welcome to the Home Page'
  });
});

//middleware 
app.use('/api', router);

//connect mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Connected To MongoDB....`))
  .catch((err) => console.log(err));

//app.use(routes);

app.listen(PORT, () => console.log(`Listening port ${PORT}`));
