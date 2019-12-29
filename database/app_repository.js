
class AppRepository {
  constructor(dao) {
    this.dao = dao
  }

  dropTable() {
    const sql = `
    DROP TABLE IF EXISTS clinics
    `
    return this.dao.run(sql)
  }

  createTableWithDrop() {
    return this.dropTable()
      .then(() => {
        const sql = `
        CREATE TABLE IF NOT EXISTS clinics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          clinicName TEXT,
          diagramParsed TEXT
        )`
        return this.dao.run(sql)
      })
      .catch(e => e)
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS clinics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clinicName TEXT,
      diagramParsed TEXT
    )`
    return this.dao.run(sql)
  }

  create(name, diagramParsed = '') {
    return this.dao.run(
      'INSERT INTO clinics (clinicName, diagramParsed) VALUES (?, ?)',
      [name, diagramParsed])
  }

  update(clinic) {
    const { id, diagramParsed } = clinic
    return this.dao.run(
      `UPDATE clinics SET diagramParsed = ? WHERE id = ?`,
      [diagramParsed, id]
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

module.exports = AppRepository;