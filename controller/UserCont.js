const User = require("../models/User");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res) => {
  //REGISTRATION
  const { username, password, user_fullnames, access_level } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = {
      ...req.body,
      username: username,
      user_fullnames: user_fullnames,
      password: hashedPassword,
      balance: 0.0,
      request_balance: 0,
      rejected_balance: 0,
      transaction_status: null,
      subscription_status: "inactivated",
    };
    const Existuser = await User.findOne({ username });
    if (Existuser) {
      return res.json({ message: "User already exist" });
    }
    const user = new User(userObject);
    await user.save();
    return res.json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "user not created", err });
  }
};

//LOGIN
const UserLogin = async (req, res) => {
  let foundUser = {};
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
   
      const  {
        
        user_fullnames,
        balance,
        request_balance,
        rejected_balance,
        access_level,
        transaction_status,
        subscription_status } = user;
        
        res.status(201).json({ message: "Login successful", 
        data:{
          username,
          user_fullnames,
          balance,
          request_balance,
          rejected_balance,
          access_level,
          transaction_status,
          subscription_status}});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { CreateUser, UserLogin };
