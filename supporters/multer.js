const multer = require('multer');
const  { existsSync, mkdirSync }  = require("fs");
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!existsSync("uploads")) {
      mkdirSync("uploads");
    }
    cb(null, "uploads",true);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname),true);
    // cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;


