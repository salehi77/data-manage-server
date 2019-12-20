const ClinicModel = require("../../db/models/ClinicModel");
const { getErrorObject } = require('./utils')

function updateDiagram(req, res, next) {
  if (!req.body.id) {
    return next(getErrorObject("MustHaveID"));
  }
  if (!req.body.diagramModel) {
    return next(getErrorObject("MissedArgument"));
  }

  ClinicModel.findOneAndUpdate(
    { _id: req.body.id },
    { diagramModel: req.body.diagramModel, lastUpdate: Date.now() },
    (err, result) => {
      if (err) {
        return next(err);
      }
      if (!result) {
        return next(getErrorObject("ClinicNotFound"));
      } else {
        return res.status(200).send({ success: true, result: result });
      }
    }
  );
}


module.exports = updateDiagram

