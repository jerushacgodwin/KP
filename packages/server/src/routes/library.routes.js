const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library.controller");

// Books
router.get("/books", libraryController.getBooks);
router.post("/books", libraryController.addBook);

// Categories
router.get("/categories", libraryController.getCategories);

// Circulation
router.post("/issue", libraryController.issueBook);
router.patch("/return/:id", libraryController.returnBook);

module.exports = router;
