const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const multer = require("multer")
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())

mongoose
  .connect(
    "mongodb+srv://shailesh123:rYbeOdoWZtY9NdKU@cluster0.e1ege.mongodb.net/Group2-Database?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});

// mongodb+srv://shailesh123:rYbeOdoWZtY9NdKU@cluster0.e1ege.mongodb.net/Group2-Database?retryWrites=true&w=majority
