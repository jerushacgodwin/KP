const hostelService = require("../services/hostel.services");

// --- Records ---
module.exports.getRecords = async (req, res, next) => {
  try {
    const records = await hostelService.getAllHostelRecords(req.query);
    res.status(200).json({ message: "Hostel records fetched successfully", result: records });
  } catch (err) {
    next(err);
  }
};

module.exports.addRecord = async (req, res, next) => {
  try {
    const record = await hostelService.createHostelRecord(req.body);
    res.status(201).json({ message: "Hostel record created successfully", result: record });
  } catch (err) {
    next(err);
  }
};

// --- Fees ---
module.exports.getFees = async (req, res, next) => {
  try {
    const fees = await hostelService.getHostelFees(req.query);
    res.status(200).json({ message: "Hostel fees fetched successfully", result: fees });
  } catch (err) {
    next(err);
  }
};

module.exports.updateFee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fee = await hostelService.updateHostelFee(id, req.body);
    res.status(200).json({ message: "Hostel fee updated successfully", result: fee });
  } catch (err) {
    next(err);
  }
};
