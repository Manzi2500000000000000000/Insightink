const express = require('express');
const router = express.Router();
const { createPost } = require('../controller/PostCont');
const upload = require('../supporters/multer');


router.post('/post', upload.single("Image"), createPost);


module.exports = router;