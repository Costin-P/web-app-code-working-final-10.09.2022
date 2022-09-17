module.exports=(app)=>{
const { searchbyid, searchbyidandtype, booking } = require("../controllers/controllers");
app.get('/search/:location', searchbyid);
app.get('/search/:location/:type', searchbyidandtype);
app.post('/booking', booking);
app.get('/',(req,res)=>{
    res.render('main.ejs');
});

app.get('/login',(req,res)=>{
    res.render('login.ejs');
});

app.get('/booking',(req,res)=>{
    res.render('booking.ejs');
});

}


