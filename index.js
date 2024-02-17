const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require('./routes/userRoutes');
const postRoutes = require("./routes/bookRoutes");
const path = require("path")

const cors = require('cors')
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoBD"))
    .catch((err) => console.log(err));
app.use(cors())
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/books", postRoutes);

app.get("/uploads/:file", async (req, res) => {
    const { file } = req.params;
    const fileLocation = `/uploads/${file}`
    try {
        return res.status(200).sendFile(path.join(__dirname, fileLocation));
    } catch (error) {
        console.error("Error reading PDF file:", path.join(__dirname, fileLocation));
        return res.status(500).json({ message: "Internal server error" });
    }
});
app.get("/",(req,res)=>{
    return res.send("Insightfulink");
})
app.listen("5000", () => {
    console.log("Backend is running")
});


