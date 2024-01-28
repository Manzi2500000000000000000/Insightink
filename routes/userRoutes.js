const express = require('express');
const router = express.Router();
const UserCont = require('../controller/UserCont');

router.post('/register', function(req, res){
    UserCont.CreateUser
  });
  router.post('/login', function(req, res){
    UserCont.UserLogin
  });

// router.post('/register', UserCont.CreateUser )


module.exports = router;