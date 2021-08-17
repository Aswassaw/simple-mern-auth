require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require('cors');

const app = express();
const port = process.env.PORT;

mongoose.connect();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use("/", authRoute);

// Menghubungkan Mongoose dengan MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database berhasil terkoneksi.");

    app.listen(port, () => {
      console.log("Server berjalan di port " + port);
      console.log("http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.log("Database gagal terkoneksi.");
    console.log(err);
  });
