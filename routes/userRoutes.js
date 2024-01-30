const express = require("express");
const router = express.Router();
const UserCont = require("../controller/UserCont");

router.post("/register", UserCont.CreateUser);

router.post("/login", UserCont.UserLogin);

router.post("/subscribe", UserCont.Subscription);

router.put("/update/:id", UserCont.UserUpdate);

module.exports = router;
