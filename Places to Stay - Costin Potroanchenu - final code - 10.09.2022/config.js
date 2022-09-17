const mysql=require('mysql2');
const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "costin"
});

con.connect((error)=>{
    if (error)
     console.log("We are sorry. Mysql failed to start");
     else
     console.log("Connected suceesfully to Database !");
});

module.exports=con;