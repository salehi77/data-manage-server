const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const mongoDB = "mongodb://user:password1@ds053479.mlab.com:53479/heal";

let db;

try {
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
} catch (ext) {
  console.log("error");
}

module.exports = db;
