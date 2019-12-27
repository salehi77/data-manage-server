

class ClinicRepository {
  constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS clinics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT)`
    return this.dao.run(sql)
  }

  create(name) {
    return this.dao.run(
      'INSERT INTO clinics (name) VALUES (?)',
      [name])
  }

  update(project) {
    const { id, name } = project
    return this.dao.run(
      `UPDATE clinics SET name = ? WHERE id = ?`,
      [name, id]
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