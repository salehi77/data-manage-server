const ClinicModel = require("../../db/models/ClinicModel");


function getClinics(req, res, next) {
  ClinicModel.find((err, result) => {
    if (err) {
      return next(err);
    }
    else {
      res.status(200).send({ success: true, result: result });
    }
  });
}



module.exports = getClinics

