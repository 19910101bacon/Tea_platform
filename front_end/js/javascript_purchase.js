$(document).ready(function() {

  document.getElementById("Add").addEventListener("click", add_purchase_data);

  // 處理消費者按鈕
  $(document).on("click", "#customer-confirm", function() {
    var empty = false;
    var input_telephone = $(this).parents().find("#inputtellphoneinline")
    if (!input_telephone.val()) {
      $("#inputtellphoneinline").addClass("required1");
    } else {
      console.log('1')
      $("#inputtellphoneinline").removeClass("required1");
      empty = true;
    }

    telephone = $("#inputtellphoneinline")
    name = $("#inputnameinline")

    // input telephone name -> 去 customers collection 的 name 和 telephone欄位做比較 -> output "new" "old"

  });


  // 處理『送出』的按鈕
  $(document).on("click", "#Save", function() {
    // if empty == 'false'{
    //   alert('請確認消費者電話填寫正確')
    // }
    iname = [];
    amount = [];
    var x = document.querySelectorAll( 'body #amount' )
    for(i=1; i <= x.length; i++){
      amount.push(x[i-1].value);
    }

    var x = document.querySelectorAll( 'body #Iname' )
    for(i=1; i <= x.length; i++){
      iname.push(x[i-1].value);
    }

    telephone = document.getElementById("inputtellphoneinline").value
    money = document.getElementById("inputmoney").value

    console.log(iname)
    console.log(amount)

    // input telephone, iname, amount, money  ->     -> 購買項目原價錢  折扣

  });


});



var add_purchase_data = function() {
  var original = document.getElementById('container');
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "container" + 1; // there can only be one element with an ID
  original.parentNode.appendChild(clone);
};
