var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customer = new Schema({
  Cname: String,
  Phone: Number,
  Timestamp: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('customer', customer);
