var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var purchase = new Schema({
  Cname: String,
  Tot_price: Number,
  Ori_price: Number,
  Discount: Number,
  Buy: {
    Iname: [String],
    Inum: [Number]
  },
  Timestamp: Number
}, {
  versionKey: false
});

module.exports = mongoose.model('purchase', purchase);
