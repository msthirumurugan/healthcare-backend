const Appointment = require('../models/appointment.model')
const User = require('../models/user.model')
const logger = require('../config/logger')

exports.createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      date,
      timeslot,
      appointmentDescription,
      additionalInfo
    } = req.body;

    // Validate patient and doctor existence
    const patient = await User.findById(patientId);
    if (!patient && patient.role === "patient") return res.status(404).json({
      error: 'Patient not found due to incorrect patient details'
    });

    const doctor = await User.findById(doctorId);
    if (!doctor && doctor.role === "doctor") return res.status(404).json({
      error: 'Doctor not found due to incorrect doctor detials'
    });

    // Create a new appointment
    const appointment = new Appointment({
      patientId,
      doctorId,
      date,
      timeslot,
      appointmentDescription,
      additionalInfo,
    });

    // Save the appointment to the database
    await appointment.save();
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    logger.error(`error occured during creating the appointment error: ${error}`)
    res.status(500).json({
      error: error.message
    });
  }
}

exports.getLatestAppointments = async (req, res) => {
  try {
    const userId = req.userId;
    logger.info(`the user id: ${userId}`)
    const latestAppointment = await Appointment.findOne({
        patientId: userId
      })
      .sort({
        date: -1,
        createdAt: -1
      }) // Sort by latest date and time
      .populate('doctorId', 'firstname lastname') // Populate doctor details if needed
      .populate('patientId', 'firstname lastname'); // Populate patient details if needed

    if (!latestAppointment) {
      return res.status(404).json({
        message: 'No appointments found for this user'
      });
    }

    res.status(200).json({
      message: 'Latest appointment retrieved successfully',
      latestAppointment
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

exports.getTodaysAppointments = async (req, res) => {
  try {
    const doctorId = req.userId;
    const appointments = await Appointment.find({
        doctorId
      })
      .sort({
        date: 1,
        timeslot: 1
      })
      .populate('patientId', 'firstname lastname')
      .populate('doctorId', 'firstname lastname');

    if (appointments.length === 0) {
      return res.status(404).json({
        message: 'No appointments found for this doctor'
      });
    }

    res.status(200).json({
      message: 'Appointments retrieved successfully',
      appointments
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

exports.getPatientInfo = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const doctorId = req.userId;

    const PatientData = await User.findById(patientId)

    const patientBookingHistory = await Appointment.find({ patientId, doctorId })
    .sort({ date: 1, timeslot: 1 }) // Sort by date and timeslot
    .populate('patientId', 'firstname lastname') // Populate patient details
    .populate('doctorId', 'firstname lastname'); // Populate doctor details

    if (patientBookingHistory.length === 0) {
      return res.status(404).json({ message: 'No appointments found for the given patient and doctor' });
    }

    res.status(200).json({ message: 'Appointments retrieved successfully', PatientData, patientBookingHistory });
  } catch(error) {
    res.status(500).json({
      error: error.message
    });
  }
}