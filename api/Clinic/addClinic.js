const ClinicModel = require("../../db/models/ClinicModel");
const { getErrorObject } = require('./utils')

function addClinic(req, res, next) {

  if (!req.body.clinicName) {
    return next(getErrorObject("MissedArgument"));
  }

  const clinic = new ClinicModel({
    name: req.body.clinicName,
    lastUpdate: Date.now(),
    description: ""
  });
  clinic.save((err, result) => {
    if (err) {
      return next(err)
    }
    else {
      res.status(201).send({ success: true, result: result })
    }
  });

}



module.exports = addClinic

