var express = require("express");
var router = express.Router();
const db = require("../db/connection");
const ClinicModel = require("../db/models/ClinicModel");

db.on("open", () => {
  console.log("index.js");
});

// const kidney = new ClinicModel({
//   name: "kidney6",
//   lastUpdate: Date.now(),
//   description: "6666666666666666"
// });
// kidney.save((err, res) => {
//   if (err) return console.error(err);
//   console.log(res);
// });

router.get("/get_clinics", function(req, res, next) {
  ClinicModel.find((err, result) => {
    if (err) {
      res.status(500).send({ success: false, error: "error" });
    } else {
      res.status(200).send({ success: true, result: result });
    }
  });
});

router.get("/get_clinic_description", function(req, res, next) {
  console.log(req.query);

  if (!req.query.id) {
    res.status(400).send({ success: false, error: "MustHaveID" });
    return;
  }

  ClinicModel.findOne({ _id: req.query.id }, (err, result) => {
    if (err) {
      if (err.name === "CastError") {
        res.status(400).send({ success: false, error: "BadID" });
      } else {
        res.status(500).send({ success: false, error: "InternalError" });
      }
      return;
    }
    if (!result) {
      res.status(404).send({ success: false, error: "UserNotFound" });
      return;
    } else {
      res.status(200).send({ success: true, result: result });
      return;
    }
  });
});

router.patch("/update_clinic_description", (req, res) => {
  console.log(req.body);
  res.send("ddd");
});

module.exports = router;
