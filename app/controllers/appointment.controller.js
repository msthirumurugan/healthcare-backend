const Appointment = require('../models/appointment.model')
const User = require('../models/user.model')

exports.createAppointment = async (req,res) => {
    try {
        const { patientId, doctorId, date, timeslot, appointmentDescription, additionalInfo } = req.body;
    
        // Validate patient and doctor existence
        const patient = await User.findById(patientId);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });
    
        const doctor = await User.findById(doctorId);
        if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    
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
        res.status(201).json({ message: 'Appointment created successfully', appointment });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getLatestAppointments = async (req,res) => {
  try {
    const userId  = req.userId;
    const latestAppointment = await Appointment.findOne({ patientId: userId })
      .sort({ date: -1, createdAt: -1 }) // Sort by latest date and time
      .populate('doctorId', 'firstname lastname') // Populate doctor details if needed
      .populate('patientId', 'firstname lastname'); // Populate patient details if needed

    if (!latestAppointment) {
      return res.status(404).json({ message: 'No appointments found for this user' });
    }

    res.status(200).json({ message: 'Latest appointment retrieved successfully', latestAppointment });
  
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
