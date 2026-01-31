const transportService = require("../services/transport.services");

// --- Buses ---
module.exports.getBuses = async (req, res, next) => {
  try {
    const buses = await transportService.getAllBuses();
    res.status(200).json({ message: "Buses fetched successfully", result: buses });
  } catch (err) {
    next(err);
  }
};

module.exports.addBus = async (req, res, next) => {
  try {
    const bus = await transportService.createBus(req.body);
    res.status(201).json({ message: "Bus added successfully", result: bus });
  } catch (err) {
    next(err);
  }
};

// --- Routes ---
module.exports.getRoots = async (req, res, next) => {
  try {
    const { bus_id } = req.params;
    const roots = await transportService.getBusRoots(bus_id);
    res.status(200).json({ message: "Bus roots fetched successfully", result: roots });
  } catch (err) {
    next(err);
  }
};

module.exports.addRoot = async (req, res, next) => {
  try {
    const root = await transportService.addBusRoot(req.body);
    res.status(201).json({ message: "Bus root added successfully", result: root });
  } catch (err) {
    next(err);
  }
};

// --- Staff ---
module.exports.getStaff = async (req, res, next) => {
  try {
    const { bus_id } = req.params;
    const staff = await transportService.getBusStaff(bus_id);
    res.status(200).json({ message: "Bus staff fetched successfully", result: staff });
  } catch (err) {
    next(err);
  }
};

module.exports.addStaff = async (req, res, next) => {
  try {
    const staff = await transportService.addBusStaff(req.body);
    res.status(201).json({ message: "Bus staff added successfully", result: staff });
  } catch (err) {
    next(err);
  }
};
