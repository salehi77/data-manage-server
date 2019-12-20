const express = require("express");
const router = express.Router();
const db = require("../db/connection");

const { getClinics, getClinic, updateDiagram, deleteClinic, addClinic } = require('../api/controllers')

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


router.get("/get_clinics",
  getClinics
);


router.get("/get_clinic",
  getClinic
);


router.patch("/update_diagram",
  updateDiagram
);


router.post("/add_clinic",
  addClinic
);


router.delete("/delete_clinic",
  deleteClinic
);



router.use(function (err, req, res, next) {
  if (err) {
    if (err.type === 1) {
      return res.status(err.status).send(err);
    }
    else {
      if (err.name === "CastError") {
        return res.status(400).send({ success: false, error: "BadID" });
      }
      else {
        return res.status(500).send({ success: false, error: "InternalError" });
      }
    }
  }
  return res.status(500).send({ success: false, error: "InternalError" });
});


module.exports = router;
