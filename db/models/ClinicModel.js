const mongoose = require("mongoose");

const ClinicSchema = new mongoose.Schema({
  name: String,
  lastUpdate: Date,
  description: String,
  algorithm: Object
});

const ClinicModel = mongoose.model("Clinic", ClinicSchema);

module.exports = ClinicModel;
