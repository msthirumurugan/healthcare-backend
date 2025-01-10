const mongoose = require('mongoose');

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Patient ID is required'],
    ref: 'User',
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Doctor ID is required'],
    ref: 'User',
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required'],
  },
  timeslot: {
    type: String,
    required: [true, 'Timeslot is required'],
    match: [
      /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/,
      'Timeslot must be in the format HH:MM-HH:MM',
    ],
  },
  appointmentDescription: {
    type: String,
    trim: true,
    maxlength: [500, 'Appointment description cannot exceed 500 characters'],
  },
  additionalInfo: {
    type: String,
    trim: true,
    maxlength: [500, 'Additional info cannot exceed 500 characters'],
  },
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
