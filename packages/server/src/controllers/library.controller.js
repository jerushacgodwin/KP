const libraryService = require("../services/library.services");

// --- Books ---
module.exports.getBooks = async (req, res, next) => {
  try {
    const books = await libraryService.getAllBooks(req.query);
    res.status(200).json({ message: "Books fetched successfully", result: books });
  } catch (err) {
    next(err);
  }
};

module.exports.addBook = async (req, res, next) => {
  try {
    const book = await libraryService.createBook(req.body);
    res.status(201).json({ message: "Book added successfully", result: book });
  } catch (err) {
    next(err);
  }
};

// --- Categories ---
module.exports.getCategories = async (req, res, next) => {
  try {
    const categories = await libraryService.getAllCategories();
    res.status(200).json({ message: "Categories fetched successfully", result: categories });
  } catch (err) {
    next(err);
  }
};

// --- Circulation ---
module.exports.issueBook = async (req, res, next) => {
  try {
    const record = await libraryService.issueBook(req.body);
    res.status(201).json({ message: "Book issued successfully", result: record });
  } catch (err) {
    next(err);
  }
};

module.exports.returnBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { receivedDate } = req.body;
    const record = await libraryService.returnBook(id, receivedDate);
    res.status(200).json({ message: "Book returned successfully", result: record });
  } catch (err) {
    next(err);
  }
};
