const Book = require('../models/Book');
const uploadFile = require('../supporters/cloudinary');

const createBook = async (req, res) => {
    const { book_title,
        book_subtitle,
        book_author,

        uploaded_by, } = req.body;
    const bookCoverImage = req.files['book_coverImage'][0]; // Access the first file uploaded for 'book_coverImage'
    const bookUrl = req.files['book_url'][0]; // Access the first file uploaded for 'book_url'
    const response = await uploadFile(bookCoverImage, res);
    // console.log(bookCoverImage,
    //     bookUrl)
    // if (response) {
    // console.log(response)
    try {
        const bookObj = {

            book_title,
            book_subtitle,
            book_coverImage: response.secure_url,
            book_author,
            book_url: bookUrl.filename,
            uploaded_by
        }
        const newBook = await Book.create(bookObj);
        /**
         *     res.status(200).json({ message: 'File uploaded successfully' });
         */
        res.status(201).json({ message: "Book created successfully", data: newBook });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
    // } else {
    //     return res.json({ message: "Uplo" })

    // }


}
const getBook = async (req, res) => {

    try {
        const user = await Book.find();

        if (!user) {
            return res.status(401).json({ message: "Books not Found" });
        }



        res.status(201).json({
            message: "Books retrieved successful",
            user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { createBook, getBook } 
