const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const bodyParser = require('body-parser')
const appointmentRouter = require('./app/routes/appointment.route')

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Health check fine!" });
});

app.use('/api/appointment', appointmentRouter)

// app.use('/api', )

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
