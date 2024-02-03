const express = require('express');
const router = express.Router();
const { createBook,getBook } = require('../controller/BookCont');
const Upload = require('../supporters/multer');


router.get('/',getBook);
router.post('/create', Upload.single("book_coverImage"), createBook);


module.exports = router;
