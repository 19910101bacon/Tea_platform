var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({
  Iname: String,
  Price: Number,
  State: String,
  Timestamp: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('item', item);
