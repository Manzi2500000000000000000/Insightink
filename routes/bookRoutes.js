const express = require('express');
const router = express.Router();
const { createBook,getBook,deleteBook, updateBook } = require('../controller/BookCont');
const Upload = require('../supporters/multer');


router.get('/',getBook);
router.get('/:book_id',getBook);
router.delete('/delete/:book_id',deleteBook);
router.delete('/delete/:book_id',deleteBook);
router.put('/update/:book_id',updateBook);
router.post('/create',  Upload.fields([{
    name: 'book_coverImage', maxCount: 1
  }, {
    name: 'book_url', maxCount: 1
  }]), createBook);


module.exports = router;
