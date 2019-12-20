function getErrorObject(error) {
  switch (error) {
    case "MustHaveID":
      return { type: 1, status: 400, success: false, error: "MustHaveID" };
    case "ClinicNotFound":
      return { type: 1, status: 404, success: false, error: "ClinicNotFound" };
    case "MissedArgument":
      return { type: 1, status: 400, success: false, error: "MissedArgument" };
    default:
      return { type: 1, status: 500, success: false, error: "InternalError" };
  }
}

module.exports = {
  getErrorObject
}