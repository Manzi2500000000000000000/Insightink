const Post = require('../models/Post');
const uploadFile = require('../supporters/cloudinary');

const createPost = async(req, res) =>{
    const response = await uploadFile(req.file, res);
    
    try{
        const newPost = await Post.create({
            Image: response.secure_url,
            // author: req.username,
            body:req.body.body
        });
        res.status(200).json({message:'Posted successfully'});
    } catch(err){
        res.status(400).json({message: err.message})
    } 

}

module.exports ={ createPost } 
