var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customer = new Schema({
  cname: String,
  phone: Number,
  timestamp: Number,
  state: String
}, {
  versionKey: false
});

module.exports = mongoose.model('customer', customer);
