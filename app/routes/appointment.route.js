const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { authJwt } = require("../middlewares");

router.post('/', [authJwt.verifyToken],appointmentController.createAppointment)

router.get('/getLatestAppointments', [authJwt.verifyToken],appointmentController.getLatestAppointments)

router.get('/getTodaysAppointments', [authJwt.verifyToken],appointmentController.getTodaysAppointments)

module.exports  = router;
