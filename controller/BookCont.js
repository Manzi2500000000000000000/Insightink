const Book = require('../models/Book');
const uploadFile = require('../supporters/cloudinary');

const createBook = async (req, res) => {
    const {book_title,
        book_subtitle,
        book_author,
        book_url,
        uploaded_by,} =  req.body;
        if (req.fileFilterError) {
            return res.status(400).json({ error: req.fileFilterError.message });
          }
    const response = await uploadFile(req.file, res);
    if(response){
        // console.log(response)
    try {
        const bookObj = {

            book_title,
            book_subtitle,
            book_coverImage: response.secure_url,
            book_author,
            book_url,
            uploaded_by
        }
        const newBook = await Book.create(bookObj);
        /**
         *     res.status(200).json({ message: 'File uploaded successfully' });
         */
        res.status(201).json({message:"Book created successfully",data:newBook});
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}else{
        return res.json({message:"bilink"})

    }
    

}
const getBook = (req,res) =>{return res.json({message:"all books"})}
module.exports = { createBook ,getBook} 

// const createBook = async (req, res) => {
//     try {
//       // Your asynchronous operations (e.g., database save)
//       const savedBook = await Book.create(req.body);
  
//       // Send a response only once
//       res.status(201).json(savedBook);
//     } catch (error) {
//       // Handle errors and send an appropriate response
//       res.status(500).json({ error: error.message });
//     }
//   };
  