const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { authJwt } = require("../middlewares");

router.post('/', [authJwt.verifyToken],appointmentController.createAppointment)

module.exports  = router;
