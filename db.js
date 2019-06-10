const mongoose = require("mongoose");
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/byarent"; //mongodb://localhost:27017/byarent   //"mongodb+srv://Paule:Paule@byarentcluster-gfhab.mongodb.net/test?retryWrites=true&w=majority"

//Function to connect to the database

const conn = mongoose
  .connect(DB_URI, {
    useNewUrlParser: true
  })
  .then((res, err) => {
    //const newStorage = res
    if (err) return reject(err);
    console.log("Database online");
    resolve();
  });

module.exports = { connect };
