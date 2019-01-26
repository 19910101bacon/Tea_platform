$(document).ready(function() {
  calculate()
})


function calculate() {
  $.ajax("http://34.226.147.247:3000/price", {
    type: 'GET',
    success: function(result) {
      var theDay = new Date()
      var year = theDay.getFullYear()
      var month = theDay.getMonth() + 1
      var date = theDay.getDate()
      var today = year + '/' + month + '/' + date + ' 00:00:00'
      var today_timestamp = (new Date(today).getTime() )
      var tomonth = year + '/' + month + '/01' + ' 00:00:00'
      var tomonth_timestamp = (new Date(tomonth).getTime() )
      var toyear = year + '/01/01' + ' 00:00:00'
      var toyear_timestamp = (new Date(toyear).getTime() )

      var today_total_price = [];
      var tomonth_total_price = [];
      var toyear_total_price = [];
      for (i = 0; i < result.length; i++) {
        if (today_timestamp < result[i].timestamp) {
          today_total_price.push(result[i].tot_price)
        }
        if (tomonth_timestamp < result[i].timestamp) {
          tomonth_total_price.push(result[i].tot_price)
        }
        if (toyear_timestamp < result[i].timestamp) {
          toyear_total_price.push(result[i].tot_price)
        }

      }
      var today_price = SumData(today_total_price)
      var today_count = today_total_price.length

      var tomonth_price = SumData(tomonth_total_price)
      var tomonth_count = tomonth_total_price.length

      var toyear_price = SumData(toyear_total_price)
      var toyear_count = toyear_total_price.length

      document.getElementById('day_amount').innerHTML = today_count
      document.getElementById('day_money').innerHTML = today_price

      document.getElementById('month_amount').innerHTML = tomonth_count
      document.getElementById('month_money').innerHTML = tomonth_price

      document.getElementById('year_amount').innerHTML = toyear_count
      document.getElementById('year_money').innerHTML = toyear_price


    }
  })
}

function SumData(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  };
  return sum;
}
