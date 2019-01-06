var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchase = new Schema({
  cname: String,
  tot_price: Number,
  ori_price: Number,
  discount: Number,
  buy: {
    iname: [String],
    inum: [Number]
  },
  timestamp: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('purchase', purchase);
