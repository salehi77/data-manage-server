

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
      diagramParsed TEXT
    )`
    return this.dao.run(sql)
  }

  create(name, diagramModel = '', diagramParsed = '') {
    return this.dao.run(
      'INSERT INTO clinics (clinicName, diagramModel, diagramParsed) VALUES (?, ?, ?)',
      [name, diagramModel, diagramParsed])
  }

  update(clinic) {
    const { id, diagramModel, diagramParsed } = clinic
    return this.dao.run(
      `UPDATE clinics SET diagramModel = ?, diagramParsed = ? WHERE id = ?`,
      [diagramModel, diagramParsed, id]
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