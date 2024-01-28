const express = require('express');
const User = require("../models/User");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
const users = [];



// //Checking User account balance
// app.get('/balance/:username', async(req, res) =>{
//     const {username} = req.params;

//     try{
//         const user = await User.findOne({ username });

//         if(!user){
//             return res.status(404).json({message:'User not found'});
//         }

//         res.json({ balance: user.balance});
//     }catch(err){
//         res.status(500).json({message:'Error fetching'});
//     }
// });

// //Requesting additional amount
// app.post('/add-amount/:username', async (req, res) =>{
//     const { username } = req.params;
//     const { amount } = req.body;

//     try{
//         if(!amount || isNaN(amount)){
//             return res.status(400).json({message:'Invalid Amount provided'});
//         }
//         const user = await User.findOne({ username });

//         if(!user){
//             return res.status(404).json({message:'User not found'});
//         }
   

//     //checking if there is an existing request
//     if (user.request_balance > 0){
//         return res.status(400).json({message:'There is a pending request...'});
        
//     }

//     //Add the requested amount to the user requestedbalance
//     user.request_balance += parseFloat(amount);
//     await user.save();
//     res.json({message:'Balance request for ${amount} submitted successfully...'});

// } catch(err){
//     res.status(200).json({message:'Error Submitting balance request'});
// }

// });