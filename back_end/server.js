var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Tea_platform');
var express = require('express');
var app = express();
var item = require('./model/Item');
var purchase = require('./model/Purchase');
var customer = require('./model/Customer');
var bodyParser = require('body-parser');
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
    result_filter = result.filter(one_item => one_item['state'] == '上架')
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

app.put('/items/update', parseUrlencoded, function(request, response) {  item.update({
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

app.delete('/items/delete', parseUrlencoded, function(request, response) {
  item.remove({iname: request.body.iname})
    .then(note => {
      if (!note) {
        return response.status(404).send({
          message: "Note not found with iname " + request.body.iname
        });
      }
      response.send({
        message: "Note deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return response.status(404).send({
          message: "Note not found with id " + request.body.iname
        });
      }
      return response.status(500).send({
        message: "Could not delete note with iname " + request.body.iname
      });
    });
});




app.get('/purchases', function(request, response) {
  purchase.find(function(err, result) {
    response.send(result);
    console.log(result);
  })
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

app.get('/customers', function(request, response) {
  customer.find(function(err, result) {
    response.send(result);
    console.log(result);
  })
});

app.post('/customers', parseUrlencoded, function(request, response) {
  var json = {
    cname: request.body.cname,
    phone: request.body.phone
  }
  console.log(request.body);

  json.timestamp = +new Date();
  newjson = new customer(json);

  customer.find({
    phone: request.body.phone
  }, function(err, result) {
    // response.send(result);
    if (!result) {
      newjson.save(function(err) {
        if (!err) {
          response.send("Success!");
        } else {
          console.log(err);
        }
      });
    } else {
      customer.find({
        phone: request.body.phone
      }).remove().exec();
      // console.log(123);
      newjson.cname = request.body.cname;
      newjson.save(function(err) {
        if (!err) {
          response.send("Success!");
        } else {
          console.log(err);
        }
      });
    }
  })
})



app.listen(3000, function(request, response) {
  console.log('Listening on port 3000!');
});
