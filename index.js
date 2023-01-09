const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
 

const app = express()
const path = require('path')
// console.log(require("dotenv").config())
require('dotenv').config({path: 'backend/.env'})
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));

// /api/v1/auth
//Available routes
// app.use('/api/v1/auth', require('./routes/auth'));
// app.use('/api/v1/notes', require('./routes/notes'));
app.use(require('./routes/auth'));
app.use('/notes',require('./routes/notes'));


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//   res.send('hello world')
// });
app.use(express.static(path.join(__dirname, './frontend/build')))
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build/index.html'),
  // res.sendFile(path.join(__dirname, './frontend/build', 'index.html'),
  function(err){
    res.status(500).send(err)
  });
});

connectToMongo();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

connectToMongo().then(() => {
  app.listen(port, () => {
      console.log(`The server is running on port: ${port}`);
  })
});

// app.listen(port,function(){
//     console.log("The server is running on port: 5000");
// });

