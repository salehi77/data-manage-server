const express = require("express");
const router = express.Router();
const { handleClinic } = require('../database/handleTables')

// const { getClinics, getClinic, updateDiagram, deleteClinic, addClinic } = require('../api/controllers')

const f = () => {
  handleClinic.create('jjjjjjj')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
      handleClinic.createTable().then(() => f()).catch(e => { })
    })
}
// f()



router.get("/", (req, res) => {
  res.send({ dddd: "ikkk" });
});


router.get("/get_clinics",
  // getClinics
);


router.get("/get_clinic",
  // getClinic
);


router.patch("/update_diagram",
  // updateDiagram
);


router.post("/add_clinic",
  // addClinic
);


router.delete("/delete_clinic",
  // deleteClinic
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
