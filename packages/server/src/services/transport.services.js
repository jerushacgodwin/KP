const { Bus, BusRoot, BusStaff, TransportStudent, Student } = require("../models");

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

// --- Student Transport ---
module.exports.getTransportStudents = async (query) => {
  const { bus_id } = query;
  const where = {};
  if (bus_id) where.bus_id = bus_id;

  return await TransportStudent.findAll({
    where,
    include: [
        { model: Student, as: "student", attributes: ["name"] },
        { model: BusRoot, as: "root", attributes: ["location", "arrival_time"] }
    ]
  });
};

module.exports.addTransportStudent = async (data) => {
  return await TransportStudent.create(data);
};
