$(document).ready(function() {
  Display_stocks_data()

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
})


function Display_stocks_data() {
  $.ajax("http://34.226.147.247:3000/stocks/shelf", {
    type: 'GET',
    success: function(result) {
      var iname = [];
      for (i = 0; i < result.length; i++) {
        iname.push(result[i].iname)
      }

      var iname_set = GetUnique(iname)
      var select_form = document.createElement("select");
      select_form.setAttribute("data-placeholder", "高山青茶")
      select_form.setAttribute("class", "chosen-select");
      select_form.setAttribute("tabindex", "4");
      select_form.setAttribute("multiple", "multiple");

      for (j = 0; j < iname_set.length; j++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", iname_set[j])
        opt.setAttribute("class", "h3")
        opt.appendChild(document.createTextNode(iname_set[j]));
        select_form.appendChild(opt)
      }
      document.getElementById("stocks-form").appendChild(select_form);


      var script1 = document.createElement("script")
      script1.setAttribute("src", "../css/chosen_v1.8.7/docsupport/jquery-3.2.1.min.js")
      script1.setAttribute("type", "text/javascript")
      document.getElementById("stocks-form").appendChild(script1);

      var script2 = document.createElement("script")
      script2.setAttribute("src", "../css/chosen_v1.8.7/chosen.jquery.js")
      script2.setAttribute("type", "text/javascript")
      document.getElementById("stocks-form").appendChild(script2);

      var script3 = document.createElement("script")
      script3.setAttribute("src", "../css/chosen_v1.8.7/docsupport/prism.js")
      script3.setAttribute("type", "text/javascript")
      document.getElementById("stocks-form").appendChild(script3);

      var script4 = document.createElement("script")
      script4.setAttribute("src", "../css/chosen_v1.8.7/docsupport/init.js")
      script4.setAttribute("type", "text/javascript")
      document.getElementById("stocks-form").appendChild(script4);

      console.log('hello')


    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      alert(textStatus, errorThrown);
    }
  });
}

function GetUnique(inputArray) {
  var outputArray = [];
  for (var i = 0; i < inputArray.length; i++) {
    if ((jQuery.inArray(inputArray[i], outputArray)) == -1) {
      outputArray.push(inputArray[i]);
    }
  }
  return outputArray;
}
