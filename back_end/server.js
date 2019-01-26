var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Tea_platform', {
  useNewUrlParser: true
});
var express = require('express');
var app = express();
var item = require('./model/Item');
var purchase = require('./model/Purchase');
var customer = require('./model/Customer');
var stock = require('./model/Stock');
var bodyParser = require('body-parser');
var Passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var parseUrlencoded = bodyParser.urlencoded({
  extended: false
});


app.all('*', function(req, res, next) { //TO fix the CORS bug
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static('../front_end'));

app.get('/', function(request, response) {
  response.send("Hello World!");
});

app.get('/items', function(request, response) {
  item.find(function(err, result) {
    response.send(result);
    console.log(result);
  })
});

app.get('/items/shelf', function(request, response) {
  item.find(function(err, result) {
    result_filter = result.filter(one_item => one_item['state'] !== '刪除')
    response.send(result_filter);
    console.log(result_filter);
  })
});

app.get('/stocks/shelf', function(request, response) {
  stock.find(function(err, result) {
    result_filter = result.filter(one_item => one_item['stock_state'] == '有庫存')
    response.send(result_filter);
    console.log(result_filter);
  })
});


app.post('/items', parseUrlencoded, function(request, response) {
  var json = {
    iname: request.body.iname,
    price: request.body.price,
    state: request.body.state,
    date: request.body.date,
    unit: request.body.unit,
    timestamp: new Date()
  }

  // json.timestamp = +new Date();
  newjson = new item(json);
  newjson.save(function(err) {
    if (!err) {
      response.send("Success!");
    } else {
      console.log(err);
    }
  });
});

app.put('/items/update', parseUrlencoded, function(request, response) {
  item.update({
    iname: request.body.iname_old,
    unit: request.body.unit_old,
    price: request.body.price_old,
    date: request.body.date_old,
    state: request.body.state_old
  }, {
    $set: {
      state: "刪除"
    }
  }, function(err, result) {
    if (err)
      console.log(err);
    console.log(result);

    var json = {
      iname: request.body.iname,
      unit: request.body.unit,
      price: request.body.price,
      date: request.body.date,
      state: request.body.state,
      timestamp: +new Date()
    }

    // json.timestamp = +new Date();
    newjson = new item(json);
    newjson.save(function(err) {
      if (!err) {
        response.send("Success!");
      } else {
        console.log(err);
      }
    });
  });
})

app.put('/items/update_afterstock', parseUrlencoded, function(request, response) {
  item.update({
    iname: request.body.iname_old,
    date: request.body.date_old
  }, {
    $set: {
      state: "刪除"
    },
  }, {
    multi: true
  }, function(err, result) {
    if (err)
      console.log(err);
    console.log(result);

    var json = {
      iname: request.body.iname,
      unit: request.body.unit,
      price: request.body.price,
      date: request.body.date,
      state: request.body.state,
      timestamp: +new Date()
    }

    // json.timestamp = +new Date();
    newjson = new item(json);
    newjson.save(function(err) {
      if (!err) {
        response.send("Success!");
      } else {
        console.log(err);
      }
    });
  });
})


app.put('/stock/update', parseUrlencoded, function(request, response) {
  stock.update({
    iname: request.body.iname_old,
    amount: request.body.amount_old,
    money: request.body.money_old,
    stock_state: request.body.stock_state_old,
    date: request.body.date_old
  }, {
    $set: {
      stock_state: "刪除"
    }
  }, function(err, result) {
    if (err)
      console.log(err);
    console.log(result);

    var json = {
      iname: request.body.iname,
      amount: request.body.amount,
      stock_state: request.body.stock_state,
      money: request.body.money,
      date: request.body.date,
      timestamp: +new Date()
    }

    // json.timestamp = +new Date();
    newjson = new stock(json);
    newjson.save(function(err) {
      if (!err) {
        response.send("Success!");
      } else {
        console.log(err);
      }
    });
  });
});


// item.update({
//   iname: request.body.iname_old,
//   date: request.body.stock_state_old
// }, {
//   $set: {
//     state: "刪除"
//   }
// }, function(err, result) {
//   if (err)
//     console.log(err);
//   console.log(result);
//
//   var json = {
//     iname: "",
//     unit: "",
//     price: 999,
//     date: "",
//     state: "刪除",
//     timestamp: +new Date()
//   }
//
//   // json.timestamp = +new Date();
//   newjson = new item(json);
//   newjson.save(function(err) {
//     if (!err) {
//       response.send("Success!");
//     } else {
//       console.log(err);
//     }
//   });
// });






//
// app.delete('/items/delete', parseUrlencoded, function(request, response)
//   item.remove({
//       // 'iname': request.body.iname,
//       'date': request.body.date
//       // 'unit': request.body.unit,
//       // price: request.body.price
//       // 'state': request.body.state
//     })
//     // .then(note => {
//     //   if (!note) {
//     //     return response.status(404).send({
//     //       message: "Note not found with iname " + request.body.iname
//     //     });
//     //   }
//     //   response.send({
//     //     message: "Note deleted successfully!"
//     //   });
//     // }).catch(err => {
//     //   if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//     //     return response.status(404).send({
//     //       message: "Note not found with id " + request.body.iname
//     //     });
//     //   }
//     //   return response.status(500).send({
//     //     message: "Could not delete note with iname " + request.body.iname
//     //   });
//     // });
// });




app.get('/purchases', function(request, response) {
  purchase.find(function(err, result) {
    response.send(result);
    console.log(result);
  })
});

app.put('/purchases/update', parseUrlencoded, function(request, response) {
  purchase.update({
    cname: request.body.cname_old,
    idate: request.body.idate_old,
    iunit: request.body.iunit_old,
    tot_price: request.body.tot_price_old,
    discount: request.body.discount_old,
    iname: request.body.iname_old,
    inum: request.body.inum_old,
    timestamp: request.body.timestamp_old,
    purchase_state: request.body.purchase_state_old
  }, {
    $set: {
      purchase_statestate: "刪除"
    }
  }, function(err, result) {
    if (err)
      console.log(err);
    console.log(result);

    var json = {
      cname: request.body.cname,
      idate: request.body.idate,
      iunit: request.body.iunit,
      tot_price: request.body.tot_price,
      discount: request.body.discount,
      iname: request.body.iname,
      inum: request.body.inum,
      timestamp: request.body.timestamp,
      purchase_state: request.body.purchase_state
    }

    // json.timestamp = +new Date();
    newjson = new purchase(json);
    newjson.save(function(err) {
      if (!err) {
        response.send("Success!");
      } else {
        console.log(err);
      }
    });
  });
});



app.post('/purchases', parseUrlencoded, function(request, response) {
  var json = {
    cname: request.body.cname,
    tot_price: request.body.tot_price,
    ori_price: request.body.ori_price,
    discount: request.body.discount,
    buy: {
      iname: JSON.parse(request.body.buy).iname,
      inum: JSON.parse(request.body.buy).inum
    }
  }
  console.log(request.body);

  json.timestamp = +new Date();
  newjson = new purchase(json);
  newjson.save(function(err) {
    if (!err) {
      response.send("Success!");
    } else {
      console.log(err);
    }
  });
})


app.get('/price', parseUrlencoded, function(request, response) {
  purchase.find(function(err, result) {
    response.send(result);
    console.log(result);
  })
})






app.listen(3000, function(request, response) {
  console.log('Listening on port 3000!');
});
