var express = require("express");
var router = express.Router();
const db = require("../db/connection");
const ClinicModel = require("../db/models/ClinicModel");

db.on("open", () => {
  console.log("index.js");
});

// const kidney = new ClinicModel({
//   name: "kidney7",
//   lastUpdate: Date.now(),
//   description: "6666666666666666"
// });
// kidney.save((err, res) => {
//   if (err) return console.error(err);
//   console.log(res);
// });

router.get("/", (req, res) => {
  res.send({ dddd: "ikkk" });
});

router.get("/get_clinics", function (req, res, next) {
  ClinicModel.find((err, result) => {
    if (err) {
      res.status(500).send({ success: false, error: "error" });
    } else {
      res.status(200).send({ success: true, result: result });
    }
  });
});

router.get("/get_clinic", function (req, res, next) {

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
});

router.patch("/update_diagram", (req, res, next) => {
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
});

router.post("/add_clinic", (req, res, next) => {

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

});

router.use(function (err, req, res, next) {
  if (err.type === 1) {
    res.status(err.status).send(err);
  } else {
    if (err.name === "CastError") {
      res.status(400).send({ success: false, error: "BadID" });
    } else {
      res.status(500).send({ success: false, error: "InternalError" });
    }
  }
});

function getErrorObject(error) {
  switch (error) {
    case "MustHaveID":
      return { type: 1, status: 400, success: false, error: "MustHaveID" };
    case "ClinicNotFound":
      return { type: 1, status: 404, success: false, error: "ClinicNotFound" };
    case "MissedArgument":
      return { type: 1, status: 400, success: false, error: "MissedArgument" };
    default:
      return { type: 1, status: 500, success: false, error: "InternalError" };
  }
}

module.exports = router;
