const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const clinicRouter = require('./routes/clinicRoute')
require('./database/handleTables')

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const { handleClinic } = require('./database/handleTables')





app.use(clinicRouter)




app.get('/create_app', (req, res) => {

  res.send('create app')

  const AppDAO = require('./database/dao')
  const AppRepository = require('./database/app_repository')
  const dao = new AppDAO('./database/app.sqlite3')
  const appRepo = new AppRepository(dao)

  appRepo.createTableWithDrop()
    .then(result => {
      return result
    })
    .then(() => {
      return handleClinic.getAll()
        .then(rows => {
          return rows
        })
        .catch(e => { throw e })
    })
    .then(rows => {
      addRows(rows)
    })
    .catch(error => {
      console.log(error)
    })

  const addRows = async (rows) => {
    for (let i = 0; i < rows.length; ++i) {
      try {
        await appRepo.create(rows[i].clinicName, rows[i].diagramParsed)
      }
      catch (e) { }
    }
  }

})





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('not found')
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
