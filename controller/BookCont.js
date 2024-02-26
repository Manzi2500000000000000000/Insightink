const fs = require('fs');
const Book = require("../models/Book");
const uploadFile = require("../supporters/cloudinary");

const createBook = async (req, res) => {
  const { book_title, book_subtitle, book_author, uploaded_by } = req.body;

  const bookCoverImage = req.files["book_coverImage"][0];
  const bookUrl = req.files["book_url"][0];
  const response = await uploadFile(bookCoverImage, res);

  try {
    const bookObj = {
      book_title,
      book_subtitle,
      book_coverImage: response.secure_url,
      book_author,
      book_url: bookUrl.path,
      uploaded_by:'System Admin'
    };
    const newBook = await Book.create(bookObj);

    res
      .status(201)
      .json({ message: "Book created successfully", data: newBook });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

};
const getBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    if (book_id) {
      const bookObj = await Book.findById(book_id);
      if (!bookObj) {
        return res.status(200).json({ error: "Book not found" });
      }
      return res.status(200).json({
        message: "Book retrieved successfully",
        bookObj,
      });
    } else {
      const books = await Book.find();
      if (!books || books.length === 0) {
        return res.status(200).json({ error: "Books not found" });
      }
      return res.status(200).json({
        message: "Books retrieved successfully",
        books,
      });
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fileRead = async (req, res) => {
  try {
    const { file } = req.params;

    // Read the PDF file as a buffer
    const fileData = await fs.promises.readFile(file);
    return res.status(200).json({
      message: "PDF file retrieved successfully",
      fileData, // Or any processed PDF information
    });
  } catch (error) {
    console.error("Error reading PDF file:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const deleteBook = async (req, res) => {
  const { book_id } = req.params;
  try {
    const book = await Book.findOneAndDelete({ _id: book_id });
    if (!book) {
      return res.status(401).json({ message: "Books not Found" });
    }
    res.status(201).json({
      message: "Book successful removed!",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
const updateBook = async (req, res) => {
  const { book_id } = req.params;
  const { updatedData } = req.body;
console.log(updatedData)
  try {
    const book = await Book.findByIdAndUpdate({ _id: book_id }, updatedData, { new: true });
    if (!book) {
      return res.status(200).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", data: book });
  } catch (error) {
    res.status(200).json({ error: "Internal server error" });
  }
};
const   totalBooks = async (req,res) =>{
  try {
    // Aggregate to get both user count and total balance
    const results = await Book.aggregate([
      {
        $group: {
          _id: null, // No grouping needed
          totalBooks: { $sum: 1 }, // Count all documents
        },
      },
    ]);

    // Extract and return the desired values
    const { totalBooks} = results[0];

    return res.status(200).json({ totalBooks });
  } catch (error) {
    return res.status(202).json({ message: "Error fetching data:", totalBooks });
  }
}
module.exports = { createBook, getBook, deleteBook, updateBook, fileRead ,totalBooks };
