

class ClinicRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS clinics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clinicName TEXT,
      diagramModel TEXT)
    `
    return this.dao.run(sql)
  }

  create(name, diagramModel = '') {
    return this.dao.run(
      'INSERT INTO clinics (clinicName, diagramModel) VALUES (?, ?)',
      [name, diagramModel])
  }

  update(clinic) {
    const { id, diagramModel } = clinic
    return this.dao.run(
      `UPDATE clinics SET diagramModel = ? WHERE id = ?`,
      [diagramModel, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM clinics WHERE id = ?`,
      [id]
    )
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM clinics WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM clinics`)
  }
}

module.exports = ClinicRepository;