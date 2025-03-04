const express = require('express')
const app = express();
const db = require('./db')
require('dotenv').config();

const bodyParser = require('body-parser')
app.use(bodyParser.json());


const port = process.env.PORT || 3000;


app.get('/', function (req, res) {
  res.send('Welcome to my hotel...')
})


const personroutes = require('./routes/personroutes');
const menuroutes = require('./routes/menuroutes');

app.use('/person', personroutes);
app.use('/menu', menuroutes);



app.listen(3000, () => {
  console.log('listening on port 3000');
})

