const AppDAO = require('./dao')
const ClinicRepository = require('./clinic_repository')

const dao = new AppDAO('./database/database.sqlite3')


const clinicRepo = new ClinicRepository(dao)


const ct = async () => {
  try {
    await clinicRepo.createTable()
  }
  catch (e) {

  }
}

ct()

module.exports = { handleClinic: clinicRepo }