//Importing express
const express = require('express');
//Importing the mustache template engine 
const mustacheExpress = require('mustache-express');
//Importing the body parser
const bodyParser = require('body-parser');
//Importin pg package (postgres package)
const { Client } = require('pg');

//

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

//Teling the expres that we use body parser package
app.use(bodyParser.urlencoded({extended:false}));


//Rout from form 
app.get('/add', (req,res)=>{
  //Rendering the mustache template for form
   res.render('med-form');
});
//Creating the route for post action from form
app.post('/meds/add', (req,res)=>{
  console.log('post body', req.body);
  //Creating new instance of Client or pg package which will hellp me to establish the connection with postgresSQL database
  const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'medical1',
      password: 'root',
      port: 5432,

  });
  //Conecting to the database with this aboce credentials. In this i put the promise
  client.connect()
  .then(()=>{
    //Consloe log the complete connection with database
      console.log('Connection comlete');
      //Creating const variable for sql query which will insert the date into db
      const sql = "INSERT INTO meds (name,count,brand) VALUES($1,$2,$3)";
      //Creating cons variable with values from form
      const params = [req.body.name,req.body.count,req.body.brand];
      //Connecting with database and inserting sql and params
      return client.query(sql, params);
  }).then((result)=>{
    //Display results of insertin
     console.log('results', result);
     //When user hit the submit button on the form redirect them to the meds page
      res.redirect('/meds');
  })
  ;
  
})
//Dashboard route
app.get('/dashboard',(req,res)=>{
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical1',
    password: 'root',
    port: 5432,

});
client.connect()
.then(()=>{
  return client.query('SELECT SUM(count) FROM meds;SELECT DISTINCT COUNT(brand) FROM meds');
})
.then((results)=>{
  console.log('?results',results[0]);
  console.log('?results',results[1]);
  res.render('dashboard',{n1:results[0].rows,n2:results[1].rows});
})
   
});

//Creating the route for meds and rendering the template 
app.get('/meds',(req,res)=>{

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical1',
    password: 'root',
    port: 5432,

});
//Conecting to the database with this aboce credentials. In this i put the promise
client.connect()
.then(()=>{
  //Query for selecting the all data from meds row
  return client.query('SELECT * FROM meds');

}).then((results)=>{
  console.log('results', results);
  //Rednering the mustache template from views folder
  res.render('meds', results);
  
})
;
  
} );

app.post('/meds/delete/:id', (req,res)=>{

  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical1',
    password: 'root',
    port: 5432,

});
//Conecting to the database with this aboce credentials. In this i put the promise
client.connect()
.then(()=>{
  //SQL query for delete items
    const sql = 'DELETE FROM meds WHERE mid= $1';
    //Here we catch id from request
    const params = [req.params.id];
    //Here we pase the query into database
    return client.query(sql,params);


}).then((results)=>{
     res.redirect('/meds');
  
});
   
});
//Creating the route for meds edit page
app.get('/meds/edit/:id', (req,res)=>{
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical1',
    password: 'root',
    port: 5432,

});
//Conecting to the database with this aboce credentials. In this i put the promise
client.connect()
.then(()=>{
  //SQL query for delete items
    const sql = 'SELECT * FROM meds WHERE mid=$1';
    //Here we catch id from request
    const params = [req.params.id];
    //Here we pase the query into database
    return client.query(sql,params);


}).then((results)=>{
     res.render('meds-edit',{med:results.rows[0]});
     console.log('results',results);
  
});
});

app.post('/meds/edit/:id',(req,res)=>{
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'medical1',
    password: 'root',
    port: 5432,

});
//Conecting to the database with this aboce credentials. In this i put the promise
client.connect()
.then(()=>{
  //SQL query for delete items
    const sql = 'UPDATE meds SET name=$1, count=$2,brand=$3 WHERE mid=$4';
    //Here we catch id from request
    const params = [req.body.name,req.body.count,req.body.brand,req.params.id];

    //Here we pase the query into database
    return client.query(sql,params);


}).then((results)=>{
     
     console.log('results',results);
     res.redirect('/meds');
  
});
});


//Create that app listen the port
app.listen(5001, ()=>{
  console.log('Listening to port 5001');
});
