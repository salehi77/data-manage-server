

class ClinicRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS clinics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clinicName TEXT,
      diagramModel TEXT,
      diagramTree TEXT
    )`
    return this.dao.run(sql)
  }

  create(clinicName, diagramModel, diagramTree) {
    return this.dao.run(
      'INSERT INTO clinics (clinicName, diagramModel, diagramTree) VALUES (?, ?, ?)',
      [clinicName, diagramModel, diagramTree])
  }

  update(clinic) {
    const { id, diagramModel, diagramTree } = clinic
    return this.dao.run(
      `UPDATE clinics SET diagramModel = ?, diagramTree = ? WHERE id = ?`,
      [diagramModel, diagramTree, id]
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