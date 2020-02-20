const express = require('express')
const router = express.Router()
const { ClinicTable } = require('../database/handleTables')


const f = () => {
  ClinicTable.create('third')
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err)
      // ClinicTable.createTable().then(() => f()).catch(e => { })
    })
}
// f()



router.get('/', (req, res) => {
  res.send({ dddd: 'ikkk' })
})


router.get('/get_clinics', (req, res, next) => {
  ClinicTable.getAll()
    .then(result => {
      res.send({ success: true, result })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })
})



router.post('/add_clinic', (req, res, next) => {

  if (!req.body.clinicName) {
    return res.status(400).send('MissedArgument')
  }
  if (!req.body.diagramModel || !req.body.diagramTree) {
    return res.status(400).send('MissedArgument')
  }

  const { clinicName, diagramModel, diagramTree } = req.body

  ClinicTable.create(clinicName, JSON.stringify(diagramModel), JSON.stringify(diagramTree))
    .then(result => {
      return result
    })
    .then(({ id }) => {
      return ClinicTable.getById(id)
    })
    .then(result => {
      res.send({ success: true, result })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })
})


router.delete('/delete_clinic', (req, res, next) => {

  if (!req.query.id) {
    return res.status(400).send('MustHaveID')
  }


  ClinicTable.delete(req.query.id)
    .then(result => {
      return result
    })
    .then(() => {
      res.status(201).send({ success: true, result: { id: parseInt(req.query.id) } })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })

})


router.get('/get_clinic', (req, res, next) => {
  if (!req.query.id) {
    return res.status(400).send('MustHaveID')
  }
  ClinicTable.getById(req.query.id)
    .then(result => {
      if (result === undefined)
        res.status(400).send({ success: false, result: 'NotFound' })
      else
        res.send({ success: true, result })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })
})


router.patch('/save_diagram', (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).send('MustHaveID')
  }
  if (!req.body.diagramModel || !req.body.diagramTree) {
    return res.status(400).send('MissedArgument')
  }

  const { id, diagramModel, diagramTree } = req.body


  ClinicTable.update({ id, diagramModel: JSON.stringify(diagramModel), diagramTree: JSON.stringify(diagramTree) })
    .then(result => {
      res.send({ success: true, result })
    })
    .catch(error => {
      res.status(500).send({ success: false, error })
    })

})






router.use(function (err, req, res, next) {
  if (err) {
    if (err.type === 1) {
      return res.status(err.status).send(err)
    }
    else {
      if (err.name === 'CastError') {
        return res.status(400).send({ success: false, error: 'BadID' })
      }
      else {
        return res.status(500).send({ success: false, error: 'InternalError' })
      }
    }
  }
  return res.status(500).send({ success: false, error: 'InternalError' })
})


function getErrorObject(error) {
  switch (error) {
    case 'MustHaveID':
      return { type: 1, status: 400, success: false, error: 'MustHaveID' }
    case 'ClinicNotFound':
      return { type: 1, status: 404, success: false, error: 'ClinicNotFound' }
    case 'MissedArgument':
      return { type: 1, status: 400, success: false, error: 'MissedArgument' }
    default:
      return { type: 1, status: 500, success: false, error: 'InternalError' }
  }
}


module.exports = router
