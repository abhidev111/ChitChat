const mongoose = require("mongoose");
mongoose.connect(process.env.DBURI, (err) => {
  if (!err) {
    console.log("successfully connected to mongoDB");
  } else {
    console.log("Coudn't connect to mongoDB");
    console.log(err);
  }
});
