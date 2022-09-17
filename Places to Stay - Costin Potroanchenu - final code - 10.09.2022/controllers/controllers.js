const con=require('../config');

exports.searchbyid=(req, res)=>{
    console.log(req.params.location);
    con.query("select * from accommodation where location=?",[req.params.location], (error, results)=>{
        if (error)
        {console.log("Failed to grab the data");
        res.status(400).json({error: "Failed to retrieve the data"});  }
        else
        { console.log("Success ! Data has been received !");
         console.log(results);
         res.status(202).json(results);
        }

    });
};

exports.searchbyidandtype=(req, res)=>{

    con.query("select * from accommodation where location=? and type=?",[req.params.location, req.params.type], 
        (error, results)=>{
            if (error)
            {console.log("Failed to grab the data");
            res.status(400).json({error: "Failed to retrieve the data"});  }
            else
            {console.log("Success ! Data has been received...");
            res.status(202).json(results);
            }

    });
};


exports.booking=(req, res)=>{

    con.query('insert into acc_bookings (accID, thedate, username, npeople) values (?, ?, ?, ?)', 
    [req.body.accID, req.body.thedate, req.body.username, req.body.npeople], (error, results)=>{
        if (error)
          {console.log("Warning !Error while inserting the data");
           res.status(450).json({error: "Error while inserting into acc_booking"});
          } 
          else
          {
            console.log("Success ! Your Data has been added !");
            res.status(200).json({success: "Success! Your Booking has been successful"});
            console.log("row affected", results.affectedRows);
            console.log("Number of people: ", req.body.npeople);
            console.log("accID: ", req.body.accID);
            console.log("DAte: ", req.body.thedate);
            con.query('update acc_dates set availability=availability-? where thedate=? and accID=?', 
                 [req.body.npeople, req.body.thedate, req.body.accID], (error, result)=>{
                    if (error)
                      {console.log("Warning! Error while updating acc_dates table");
                      res.status(450).json({error: "Error while updating into acc_dates"});}
                      else
                      {console.log("Sucess in updating acc_dates");
                      //res.status(450).json({error: "Success on updating into acc_dates"});
                      console.log("Row affected in acc_dates", result.affectedRows);}
                 });
          }
    });
};



