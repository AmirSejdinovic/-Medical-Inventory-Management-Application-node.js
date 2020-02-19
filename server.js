//Importing express
const express = require('express');

//create new instance of express
const app = express();

//Create that app listen the port
app.listen(5001, ()=>{
  console.log('Listening to port 5001');
})