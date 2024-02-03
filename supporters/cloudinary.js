const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({ 
    cloud_name: 'dmqqgiqma', 
    api_key: '243723315628637', 
    api_secret: process.env.API_SECRET
  });

const   uploadFile = async(file, res) =>{
    
    try{
        const response = await cloudinary.uploader.upload(file.path);
        return response;
    } catch(err){
        return res.status(500).json({message:'Error in uploading',files:file});
    }
}

module.exports = uploadFile;