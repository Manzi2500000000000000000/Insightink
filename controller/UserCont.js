const User = require('../models/User');

const CreateUser =async (req,res)=>{

//REGISTRATION
    const { username, password, user_fullnames} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject =({
      username: username,
      user_fullnames: user_fullnames,
      password: hashedPassword,
      balance: 0.00,
      request_balance: 0,
      rejected_balance: 0,
      transaction_status: null,
      subscription_status: "inactivated",
        

    });
    
   const user = await new User(userObject);

  return user.save().then((result) => {
    res.send({message: "user created succeesfull"});
  }).catch((err)=>{
    res.send({message: "user not created"});

    
 
});
  }   

//LOGIN

const UserLogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid Username" });
      }
  
      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid Password" });
      }
      res.json({ message: "Login successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  

  module.exports = {CreateUser,UserLogin}