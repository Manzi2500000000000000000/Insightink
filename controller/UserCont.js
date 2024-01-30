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
        access_level,
        transaction_status,
        subscription_status } = user;
        
        res.status(201).json({ message: "Login successful", 
        data:{
          username,
          user_fullnames,
          balance,
          access_level,
          transaction_status,
          subscription_status}});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//User Subscription
const Subscription = async(req, res) =>{
  const{ username, amount } =req.body;

  try{
    const startDate = new Date();
    await User.findOneAndUpdate(
      { username },
      {$push:{ subscription: { amount, startDate }}},
      { upsert:true }
    );

    res.status(201).json({message:'Subscription successful'})
  } catch(err){
    console.error('Error subscribing user:', error);
    res.status(200).json({message:'Internal server error'});
  }

  //subscription notification
  setInterval(async() =>{
    try{
      const users = await User.find();

      for (const user of users){
        for (const Subscription of user.Subscriptions){
          const notificationDate = new Date(Subscription.startDate);
          notificationDate.setFullYear(notificationDate.getFullYear() + 1);

          if (new Date() >= notificationDate){
            const notificationMessage = 'Your subscripiton of $${Subscription.amount} will end soon...';

            //logging the notification to the server console
            
            console.log('Notification for user ${user.username}: ${notificationMessage}');
          }
        }
      } 

    } catch (err){
      console.error('Error with the notification');
    }
  });
};

// UPDATE
const UserUpdate = async(req, res) =>{
if(req.body.userId === req.params.id){
  if(req.body.password){
    const salt = await bcrypt.getSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

  }
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set:req.body,
      },
      { new:true }
    );
    res.status(200).json(updatedUser);
  } catch(err){
     res.status(200).json(err);
  }
}  else{
     res.status(401).json("You can Only Update youy Account ")
}
};


module.exports = { CreateUser, UserLogin, Subscription, UserUpdate };
