const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoBD"))
.catch((err) => console.log(err));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.listen("5000", () =>{
    console.log("Backend is running")
});


