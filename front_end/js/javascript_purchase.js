$(document).ready(function() {
  Display_stocks_data()
  Search_all_purchase()
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


  $(document).on("click", ".delete", function(){
    var tr_handle = $(this).closest('tr');
    tr_handle.remove();
  })
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

function Search_all_purchase() {
  $(document).on("click", "#customer-select", function() {
    try{
        $(".table-wrappers").empty();
    }catch(err){
      console.log('error')
    }

    var select_items = $(".chosen-choices").find("span")
    var search_inames = [];
    for (i = 0; i < select_items.length; i++) {
      var iname = $(".chosen-choices").find("span").get(i).innerText
      search_inames.push(iname)
    }


    $.ajax("http://34.226.147.247:3000/items/shelf", {
      type: 'GET',
      success: function(result) {
        // Create table
        var table = document.createElement("table");
        table.setAttribute("class", "table table-bordered")

        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");
        var headRow = document.createElement("tr");

        var HeadName = ["商品名稱", "進貨日期", "單位", "價錢", "份數", "行為"]
        var AttributesClass = ["col col1 h6", "col col2 h6", "col col3 h6", "col col4 h6", "col col5 h6", "col col6 h6"]
        var AttributesDataColumn = ["col1", "col2", "col3", "col4", "col5", "col6"]

        for (i = 0; i < 6; i++) {
          var th = document.createElement("th");
          th.appendChild(document.createTextNode(HeadName[i]));
          th.setAttribute("class", AttributesClass[i]);
          th.setAttribute("class", "h2");
          th.setAttribute("data-column", AttributesDataColumn[i]);
          headRow.appendChild(th);
        }
        thead.appendChild(headRow);
        table.appendChild(thead);

        var tBody = document.createElement("tbody");

        var len = result.length;
        for (var i = 0; i < len; i++) {

          var tr = document.createElement("tr");
          for (var j = 0; j < 6; j++) {
            if (!search_inames.includes(result[i].iname)) {
              continue
            }

            var td = document.createElement("td");

            if (j == 0) {
              td.appendChild(document.createTextNode(result[i].iname));
            }

            if (j == 1) {
              td.appendChild(document.createTextNode(result[i].date));
            }

            if (j == 2) {
              td.appendChild(document.createTextNode(result[i].unit));
            }

            if (j == 3) {
              td.appendChild(document.createTextNode(result[i].price));
            }

            if (j == 4) {
              var div_form = document.createElement("div")
              var input_form = document.createElement("form")
              var span_form = document.createElement("span")
              var input = document.createElement("input");

              input.setAttribute("type", "text")
              input.setAttribute("id", "amount")
              span_form.setAttribute("class", "td")
              input_form.setAttribute("class", "tr")
              div_form.setAttribute("class", "table")

              span_form.appendChild(input)
              input_form.append(span_form)
              div_form.append(input_form)
              td.appendChild(div_form);
            }


            if (j == 5) {
              var para = ["delete"];
              var icon = ["\uE872"];

              for (k = 0; k < 1; k++) {
                var but = document.createElement("button");
                but.setAttribute("class", "h3 delete");
                but.setAttribute("type", "button");

                var ii = document.createElement("i");
                // var special_sign = document.createTextNode("")
                // special_sign.innerHTML = icon[k] + special_sign.innerHTML;
                // ii.appendChild(special_sign.innerHTML);
                ii.appendChild(document.createTextNode(icon[k]))
                ii.setAttribute("class", "material-icons");

                but.appendChild(ii)
                td.appendChild(but)
              }
            }

            td.setAttribute("class", AttributesClass[j]);
            td.setAttribute("class", "h3");
            td.setAttribute("data-column", AttributesDataColumn[j]);
            tr.appendChild(td);
          }
          tBody.appendChild(tr);
        }
        table.appendChild(tBody);

        // $("#table-wrappers").appendChild(table)
        document.getElementById("table-wrappers").appendChild(table)

        var purchase_all = document.createElement("button")
        purchase_all.setAttribute("type", "button")
        purchase_all.setAttribute("class", "btn btn-primary h5")
        purchase_all.setAttribute("id", "purchase-delivery")
        purchase_all.appendChild(document.createTextNode("購買商品送出"))
        document.getElementById("table-wrappers").appendChild(purchase_all)

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        alert(textStatus, errorThrown);
      }
    });


  })
}

function Purchase_all_finish(){
  $(document).on("click", "#purchase-delivery", function(){
      
  })
}
