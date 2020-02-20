//Importing express
const express = require('express');
//Importing the mustache template engine 
const mustacheExpress = require('mustache-express');

//create new instance of express
const app = express();
//Create new instance of mustache template engine
const mustache = mustacheExpress();

mustache.cache = null;
//Seting the template engine
app.engine('mustache', mustache);
//Seting the mustache as view engine
app.set('view engine', 'mustache');

//Telling the express that we are using static folder in whic will be static files
//Whit this the index.html inside public folder will be automaticly served as home page when we visit the listen port
app.use(express.static('public'));

//Creating the route for meds and rendering the template 
app.get('/meds',(req,res)=>{
  //Rednering the mustache template from views folder
    res.render('meds');
} );

//Rout from form


//Create that app listen the port
app.listen(5001, ()=>{
  console.log('Listening to port 5001');
});
