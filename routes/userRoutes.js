const express = require("express");
const router = express.Router();
const UserCont = require("../controller/UserCont");

router.get("/", UserCont.GetUsers);
router.post("/register", UserCont.CreateUser);

router.post("/login", UserCont.UserLogin);

router.put("/subscribe", UserCont.Subscribe);
router.put("/subscribe/approve", UserCont.approveSubscription);

router.put("/update/:id", UserCont.UserUpdate);

module.exports = router;

 