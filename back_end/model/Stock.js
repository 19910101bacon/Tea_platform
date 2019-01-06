var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stock = new Schema({
  iname: String,
  amount: Number,
  stock_state: String,
  date: String,
  timestamp: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('stock', stock);
