const express = require('express')
const app = express();

const mongoose=require("mongoose");
const mongoURL = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.12'
mongoose.connect(mongoURL);


/*
mongoose.connect(mongoURL,
{
    useNewURLParser: true,
    useUnifiedTopology: true
})
*/
/*
mongoose.connect(mongoURL)
    .then(() => console.log(''))
    .catch(err => console.error('Database connection error:', err));

*/



const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('Connected to mongo server');
})

db.on('error',(err) => {
    console.error('Mongo Connection error', err);
})

db.on('disconnected', () => {
    console.log('Disconnected to mongo server');
})

module.exports = db;

