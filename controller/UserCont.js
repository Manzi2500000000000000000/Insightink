const User = require("../models/User");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res) => {
  //REGISTRATION
  const { username, password, user_fullnames, access_level } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = {
      username,
      user_fullnames,
      password: hashedPassword,
      balance: 0.0,
      transaction_status: null,
      subscription_status: "inactive",
      access_level
    };
    if (!username || !user_fullnames || !access_level) {
      return res.json({ error: "Fill all fields" });
    }
    const Existuser = await User.findOne({ username });
    if (Existuser) {
      return res.json({ error: "User already exist" });
    }
    const user = new User(userObject);
    await user.save();
    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "user not created", err });
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

    const {

      user_fullnames,
      balance,
      access_level,
      transaction_status,
      subscription_status } = user;

    res.status(201).json({
      message: "Login successful",
      data: {
        username,
        user_fullnames,
        balance,
        access_level,
        transaction_status,
        subscription_status
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get users
const GetUsers = async (req, res) => {

  try {
    const user = await User.find();

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }




    res.status(201).json({
      message: "User retrieved successful",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//User Subscription
const Subscribe = async (req, res) => {
  const { username, amount } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      // If the user doesn't exist, you may want to handle it accordingly.
      return res.status(404).json({ message: 'User not found' });
    }

    const newBalance = user.balance + amount;

    await User.findOneAndUpdate(
      { username },
      {
        $set: { balance: newBalance },
      },
      { upsert: true }
    );


    if (newBalance < 100000) {
      return res.status(201).json({
        message: `Dear ${user.user_fullnames} thank you for subscribing on Insightfulink, kindly increase you 
      funds to exceed 100K to start reading now.  Your balance is ${newBalance > 1000 ? newBalance + 'K' : newBalance}`
      });
    } else if (newBalance === 100000) {

      return res.status(201).json({ message: `You have successfully subscribed on insightfulink happy reading ${username}` });
    } else {

      return res.status(201).json({ message: `You have successfully subscribed on insightfulink happy reading ${username}. remember to contact site admin to refund your ${newBalance > 100000 ? newBalance - 100000 : newBalance}` });
    }


  } catch (err) {
    res.status(500).json({ message: 'Error subscribing user:', error: err });
  }


}
const approveSubscription = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(404).json({ message: 'User doesn\'t exist' });
  try {
    const user = await User.findOne({ username });

    if (!user) {
      // If the user doesn't exist, handle it accordingly
      return res.status(404).json({ message: `User ${username} not found` });

    }
    if (user.balance < 100000) return res.status(451).json({ message: `Insufficient balance to approve ${username}'s approval` });

    const startDate = new Date();
    if (user.subscription_status === "Active") return res.status(201).json({ message: `${username} Already Activated` });
    const activate = await User.findOneAndUpdate(
      { username },
      {
        $set: { subscription_status: 'Active' }, // Set subscription_status to "active"
      },
      { upsert: true }
    );
    if (activate) res.status(201).json({ message: `${username} Subscription Activated` });
  } catch (err) {
    console.error('Error subscribing user:', err);
    res.status(500).json({ message: `Error in subscription activation for :${username} account`, err }); // Corrected status code for internal server error
  }



  //subscription notification
  /**
      try {
        const users = await User.find();

        for (const user of users) {
          for (const Subscription of user.Subscriptions) {
            const notificationDate = new Date(Subscription.startDate);
            notificationDate.setFullYear(notificationDate.getFullYear() + 1);

            if (new Date() >= notificationDate) {
              const notificationMessage = `Your subscripiton of $${Subscription.amount} will end soon...`;

              //logging the notification to the server console

              console.log(`Notification for user ${user.username}: ${notificationMessage}`);
            }
          }
        }

      } catch (err) {
        console.error('Error with the notification');
      }
  
  */
}


// UPDATE
const UserUpdate = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.getSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);

    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(200).json(err);
    }
  } else {
    res.status(401).json("You can Only Update youy Account ")
  }
};


module.exports = { CreateUser, UserLogin, Subscribe, UserUpdate, GetUsers, approveSubscription };
