const express = require("express");
const router = express.Router();
const transportController = require("../controllers/transport.controller");

// Buses
router.get("/buses", transportController.getBuses);
router.post("/buses", transportController.addBus);

// Roots (using "roots" consistently with the plan's and db's terminology for bus_root)
router.get("/roots/:bus_id", transportController.getRoots);
router.post("/roots", transportController.addRoot);

// Staff
router.get("/staff/:bus_id", transportController.getStaff);
router.post("/staff", transportController.addStaff);

module.exports = router;
