const express=require('express');
const app=express();
const port=9000;
const path=require('path');
const ejs=require('ejs');

app.use(express.urlencoded({ extended: false })); //middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));//THIS IS TO DECLARE THE STATIC
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require('./routes/routes.js')(app);

app.listen(process.env.port || port, (error)=>{
    if (error)
     console.log("We are sorry. Server did not start !");
     else
     console.log("Success !Server started at port ", port);
});