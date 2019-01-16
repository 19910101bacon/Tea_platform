var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchase = new Schema({
  cname: String,
  tot_price: Number,
  ori_price: Number,
  discount: Number,
  iname: String,
  idate: String,
  iunit: String,
  inum: Number,
  timestamp: Number,
  purchase_state: String
}, {
  versionKey: false
});

module.exports = mongoose.model('purchase', purchase);
