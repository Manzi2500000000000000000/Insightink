const multer = require('multer');
const path = require('path');

const Upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) =>{
        let extension = path.extname(file.originalname);
        if(extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png' ){
            cb(new Error('page not supported'), false);
        }
        cb(null,true);
    }
});

module.exports = Upload;