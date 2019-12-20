const ClinicModel = require("../../db/models/ClinicModel");
const { getErrorObject } = require('./utils')



function getClinic(req, res, next) {

  if (!req.query.id) {
    return next(getErrorObject("MustHaveID"));
  }

  ClinicModel.findOne({ _id: req.query.id }, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      return next(getErrorObject("ClinicNotFound"));
    } else {
      return res.status(200).send({ success: true, result: result });
    }
  });
}



module.exports = getClinic

