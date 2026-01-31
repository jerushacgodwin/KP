const { Book, BookCategory, LibraryRecord, LibraryReg } = require("../models");
const { Op } = require("sequelize");

// --- Book Management ---
module.exports.getAllBooks = async (query) => {
  const { BookName, BookCategoryId, BookStatus } = query;
  const where = {};
  if (BookName) where.BookName = { [Op.like]: `%${BookName}%` };
  if (BookCategoryId) where.BookCategoryId = BookCategoryId;
  if (BookStatus !== undefined) where.BookStatus = BookStatus;

  return await Book.findAll({
    where,
    include: [{ model: BookCategory, as: "category" }],
  });
};

module.exports.createBook = async (data) => {
  return await Book.create(data);
};

// --- Category Management ---
module.exports.getAllCategories = async () => {
  return await BookCategory.findAll();
};

module.exports.createCategory = async (data) => {
  return await BookCategory.create(data);
};

// --- Circulation (Issue/Return) ---
module.exports.issueBook = async (data) => {
  // Simple issuance logic
  return await LibraryRecord.create(data);
};

module.exports.returnBook = async (recordId, receivedDate) => {
  const record = await LibraryRecord.findByPk(recordId);
  if (!record) throw new Error("Library record not found");
  record.ReceivedDate = receivedDate;
  await record.save();
  return record;
};

module.exports.getCirculationHistory = async (libraryNo) => {
  return await LibraryRecord.findAll({ where: { LibraryNo: libraryNo } });
};
