const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

//Creates a schema
const employeeSchema = new Schema({
  employee_id: mongoose.Schema.Types.ObjectId,
  employee_firstName: {
    type: String,
    required: true
  },
  employee_lastName: {
    type: String,
    required: true
  },
  employee_email: {
    type: String,
    required: true
  },
  employee_joinDate: {
    type: String,
    required: true
  },
  employee_seniority: {
    type: String,
    required: true
  },
  employee_salt: {
    type: String,
    required: true
  },
  employee_hash: {
    type: String,
    required: true
  }
});

employeeSchema.methods.setPassword = function(password) {
  // creating a unique salt for a particular employee
  this.employee_salt = crypto.randomBytes(16).toString("hex");

  // hashing employee's salt and password with 1000 iterations, 64 length and sha512 digest

  this.employee_hash = crypto
    .pbkdf2Sync(password, this.employee_salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

employeeSchema.methods.validPassword = function(password) {
  let hash = crypto
    .pbkdf2Sync(password, this.employee_salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.employee_hash === hash;
};

module.exports = employee = mongoose.model("employee", employeeSchema);
