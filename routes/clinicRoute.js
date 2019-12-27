const express = require("express");
const router = express.Router();
const { handleClinic } = require('../database/handleTables')

// const { getClinics, getClinic, updateDiagram, deleteClinic, addClinic } = require('../api/controllers')

const f = () => {
  handleClinic.create('third')
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
      // handleClinic.createTable().then(() => f()).catch(e => { })
    })
}
// f()



router.get("/", (req, res) => {
  res.send({ dddd: "ikkk" });
});


router.get("/get_clinics", (req, res, next) => {
  handleClinic.getAll()
    .then(result => {
      res.send({ success: true, result })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })
});



router.post("/add_clinic", (req, res, next) => {

  if (!req.body.clinicName) {
    return res.status(400).send('MissedArgument')
  }

  handleClinic.create(req.body.clinicName)
    .then(result => {
      return result
    })
    .then(({ id }) => {
      return handleClinic.getById(id)
    })
    .then(result => {
      res.status(201).send({ success: true, result })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })
});


router.delete("/delete_clinic", (req, res, next) => {

  if (!req.query.id) {
    return res.status(400).send('MustHaveID')
  }


  handleClinic.delete(req.query.id)
    .then(result => {
      return result
    })
    .then(({ id }) => {
      return handleClinic.getById(id)
    })
    .then(result => {
      res.status(201).send({ success: true, result: { id: parseInt(req.query.id) } })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })

});


router.get("/get_clinic",
  // getClinic
);


router.patch("/update_diagram",
  // updateDiagram
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
