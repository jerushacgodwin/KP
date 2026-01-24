const SchoolFinance = require("../models/financemodel");
const SchoolFees = require("../models/schoolfees.model");
const FeeType = require("../models/feetype.model");
const { Op, fn, col, where } = require("sequelize");
const currentYear = new Date().getFullYear();
module.exports.getFinanceOfYear = async () => {
  try {
    const results = await SchoolFinance.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("date"), "%b"), "month"],
        [fn("SUM", col("amount")), "total_amount"],
        "type",
      ],
      where: where(fn("YEAR", col("date")), currentYear),
      group: ["month", "type"],
      order: [["month", "ASC"]],
    });
    return results.map((row) => ({
      date: row.get("month"),
      type: row.get("type"),
      total: parseFloat(row.get("total_amount")),
    }));
  } catch (error) {
    console.error("Error fetching attendance counts:", error);
    throw new Error("Internal server error");
  }
};
module.exports.getFinanceById = async (id) => {
  try {
    const result = await SchoolFees.findOne({
      where: { student_id: id },
      order: [["updated_at", "DESC"]],
    });
    return result;
  } catch (error) {
    console.error("Error fetching finance by ID:", error);
    throw new Error("Internal server error");
  }
};
module.exports.getFeeTypes = async () => {
  try {
    const results = await FeeType.findAll();
    return results;
  } catch (error) {
    console.error("Error fetching fee types:", error);
    throw new Error("Internal server error");
  }
};
module.exports.addFinance = async ({ student_id, class_id, amount, status }) => {
  try {
    const newFinance = await SchoolFinance.create({
      student_id,
      class_id,
      amount,
      status,
      date: new Date(),
      type: status === "paid" ? "income" : "expense",
    });
    return newFinance;
  } catch (error) {
    console.error("Error adding finance record:", error);
    throw new Error("Internal server error");
  }
};
module.exports.getFeesByStudentId = async (student_id, school_id) => {
  try {
    const results = await SchoolFees.findAll({
      where: { student_id, school_id },
    });
    if (!results || results.length === 0) {
   
      return  [] ;
    }

    return  results ;
  } catch (error) {
    console.error("Error fetching fees by student ID:", error);
    throw new Error("Internal server error");
  }
};
