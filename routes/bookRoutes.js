const express = require('express');
const router = express.Router();
const { createBook,getBook } = require('../controller/BookCont');
const Upload = require('../supporters/multer');


router.get('/',getBook);
router.post('/create',  Upload.fields([{
    name: 'book_coverImage', maxCount: 1
  }, {
    name: 'book_url', maxCount: 1
  }]), createBook);


module.exports = router;
