const mongoose = require("mongoose");

const ClinicSchema = new mongoose.Schema({
  name: String,
  lastUpdate: { type: Date, default: Date.now },
  description: { type: String, default: "" },
  diagramModel: { type: Object, default: {} }
});

const ClinicModel = mongoose.model("Clinic", ClinicSchema);

module.exports = ClinicModel;
