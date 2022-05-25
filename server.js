const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const url = "mongodb://localhost/NFT";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
mongoose.connect(url, (err) => {
  //console.log('check1')
  if (err) {
    //console.log('check2')
    console.log("Error!" + err);
  } else {
    console.log("Connected to mongodb");
  }
});
app.use(express.json());
const api = require("./Routes/api");
app.use("/api", api);

app.listen(9000, function () {
  console.log("Server Started");
});
