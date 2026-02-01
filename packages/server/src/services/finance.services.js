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
      order: [["date", "ASC"]], // Order by date to get months correctly
    });

    // Initialize all months with 0
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthData = months.map(m => ({ name: m, income: 0, expense: 0 }));

    results.forEach(row => {
        const monthName = row.get("month");
        const type = row.get("type"); // 'income' or 'expense'
        const amount = parseFloat(row.get("total_amount"));
        
        const monthEntry = monthData.find(m => m.name === monthName);
        if (monthEntry) {
            if (type === 'income') monthEntry.income = amount;
            if (type === 'expense') monthEntry.expense = amount;
        }
    });

    return monthData;
  } catch (error) {
    console.error("Error fetching finance stats:", error);
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
