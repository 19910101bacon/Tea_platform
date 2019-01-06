var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
  iname: String,
  unit: String,
  price: Number,
  state: String,
  date: String,
  timestamp: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('item', item);
