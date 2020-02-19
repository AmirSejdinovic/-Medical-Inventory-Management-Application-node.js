//Importing express
const express = require('express');

//create new instance of express
const app = express();

//Telling the express that we are using static folder in whic will be static files
//Whit this the index.html inside public folder will be automaticly served as home page when we visit the listen port
app.use(express.static('public'));

//Create that app listen the port
app.listen(5001, ()=>{
  console.log('Listening to port 5001');
});
