const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({

    Image:{
        type: String,
        required: true
    },
    // author:{
    //     type: String,
    //     required: true
    // },
    body:{
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;