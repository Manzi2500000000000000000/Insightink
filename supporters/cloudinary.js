const cloudinary = require('cloudinary').v2;

require('dotenv').config();

cloudinary.config({ 
    cloud_name: 'dmqqgiqma', 
    api_key: '243723315628637', 
    api_secret: '92-IR3mrrXlkldnG-dGYIkHzab0' 
  });

const uploadFile = async(file, res) =>{
    try{
        const response = await cloudinary.uploader.upload(file.path);
        return response;
    } catch(err){
        return res.status(500).json({message:'Error in uploading'});
    }
}

module.exports = uploadFile;