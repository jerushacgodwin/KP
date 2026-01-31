const { Bus, BusRoot, BusStaff } = require("../models");

// --- Fleet Management ---
module.exports.getAllBuses = async () => {
  return await Bus.findAll({
    include: [
      { model: BusRoot, as: "roots" },
      { model: BusStaff, as: "staff" },
    ],
  });
};

module.exports.createBus = async (data) => {
  return await Bus.create(data);
};

// --- Route Management ---
module.exports.getBusRoots = async (bus_id) => {
  return await BusRoot.findAll({ where: { bus_id } });
};

module.exports.addBusRoot = async (data) => {
  return await BusRoot.create(data);
};

// --- Transport Staff ---
module.exports.getBusStaff = async (bus_id) => {
  return await BusStaff.findAll({ where: { bus_id } });
};

module.exports.addBusStaff = async (data) => {
  return await BusStaff.create(data);
};
