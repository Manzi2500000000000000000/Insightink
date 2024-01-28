const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
        primaryKey:true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        unique:false,
    },
    user_fullnames:{
        type: String,
        required: true,
    },
    access_level: {
        type: Number,
        default:0,
    },
    balance:{
        type: Number,
        default:5000,
    },
    request_balance:{
        type: Number,
        default:0
    },
    rejected_balance:{
        type: Number,
        default:0
    }
},{timestamps: true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
