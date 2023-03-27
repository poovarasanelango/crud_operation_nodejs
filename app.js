
// serverside page
const express  = require("express");
const exphbs=require("express-handlebars");// templet engine
const bodyParser=require("body-parser");// json formet data
const mysql=require("mysql");
const path=require('path');
const hbs=require('hbs');

require('dotenv').config();



// express pkg object create 
const app=express();

//local server run port run 
const port=process.env.port || 8080;

app.use(bodyParser.urlencoded({extended:false}));
//body json handle so 
app.use(bodyParser.json());//json data transfer

//static files
app.use(express.static("public"))

//template engine
const handlebars=exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");
/*
//mysql str connn
const con=mysql.createPool({
connectionLimit:10,
host    :process.env.DB_HOST,
user    :process.env.DB_USER,
password:process.env.DB_PASS,
database:process.env.DB_NAME

});
//check database conn or not

con.getConnection((err,connection)=>{
if(err) throw err
console.log("connection okay databases..")

});*/


// //router
// app.get('/',(req,res)=>{
// res.render("home");
// });

const routes=require("./server/routes/students");
app.use('/',routes);






// listen port
app.listen(port,()=>{
console.log("listening ::"+port);
});

