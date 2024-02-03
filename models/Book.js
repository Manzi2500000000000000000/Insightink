const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    book_title: {
        type: String,
        required: true
    },
    book_subtitle: {
        type: String,
        required: true
    },
    book_coverImage: {
        type: String,
        required: true
    },
    book_author: {
        type: String,
        required: true
    },
    book_url: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: String,
        required: true
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;