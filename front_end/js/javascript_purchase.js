$(document).ready(function() {
  Display_stocks_data()
  Search_all_purchase()
  Purchase_all_finish()
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


  $(document).on("click", ".delete", function() {
    var tr_handle = $(this).closest('tr');
    tr_handle.remove();
  })
})

function Display_stocks_data() {
  $.ajax("http://3.88.219.133:3000/stocks/shelf", {
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
    try {
      $(".table-wrappers").empty();
    } catch (err) {
      console.log('error')
    }

    var select_items = $(".chosen-choices").find("span")
    var search_inames = [];
    for (i = 0; i < select_items.length; i++) {
      var iname = $(".chosen-choices").find("span").get(i).innerText
      search_inames.push(iname)
    }


    $.ajax("http://3.88.219.133:3000/items/shelf", {
      type: 'GET',
      success: function(result) {
        // Create table
        var table = document.createElement("table");
        table.setAttribute("class", "table table-bordered")

        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");
        var headRow = document.createElement("tr");

        var HeadName = ["商品名稱", "進貨日期", "單位", "價錢", "份數", "行為"]
        var AttributesClass = ["col col1", "col col2", "col col3", "col col4", "col col5", "col col6"]
        var AttributesDataColumn = ["col1", "col2", "col3", "col4", "col5", "col6"]

        for (i = 0; i < 6; i++) {
          var th = document.createElement("th");
          th.appendChild(document.createTextNode(HeadName[i]));
          th.setAttribute("class", AttributesClass[i] + " h2");
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
              input.setAttribute("class", "amount")
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

            td.setAttribute("class", AttributesClass[j] + ' h3');
            // td.setAttribute("class", "h3");
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

function Purchase_all_finish() {
  $(document).on("click", "#purchase-delivery", function() {
    var purchase_num = $(".col1").length - 1
    var ori_price = 0
    for (i = 0; i < purchase_num; i++) {
      var amount_v = document.getElementsByClassName('amount')[i].value
      if (amount_v == null || amount_v == "" || !Number.isInteger(Number(amount_v))) {
        $(".hint_alert").empty();
        $(".hint_alert").removeClass("alert")
        ALERT("請填寫品項購買數量，或是刪除該品項")
        return false
      }

      ori_price = ori_price + Number($(".col4")[i + 1].innerHTML) * amount_v
    }
    console.log(ori_price)
    var tot_price = document.getElementById("inputmoney").value
    if (tot_price == null || tot_price == "" || !Number.isInteger(Number(tot_price))) {
      $(".hint_alert").empty();
      $(".hint_alert").removeClass("alert")
      ALERT("請填寫總價錢，如『500』")
      return false
    }
    var discount = ori_price - tot_price

    var cname = document.getElementById("inputtellphoneinline").value
    if (cname == null || cname == "") {
      $(".hint_alert").empty();
      $(".hint_alert").removeClass("alert")
      ALERT("請填寫購買人手機")
      return false
    }
    var timestamp = +new Date()
    $(".hint_alert").empty();
    $(".hint_alert").removeClass("alert")

    for (i = 0; i < purchase_num; i++) {
      var iname = $(".col1")[i + 1].innerHTML
      var idate = $(".col2")[i + 1].innerHTML
      var iunit = $(".col3")[i + 1].innerHTML
      var inum = document.getElementsByClassName('amount')[i].value
      console.log(cname)
      console.log(idate)
      console.log(iunit)
      console.log(tot_price)
      console.log(discount)
      console.log(iname)
      console.log(inum)
      console.log(timestamp)

      $.ajax({
        type: 'PUT',
        url: 'http://3.88.219.133:3000/purchases/update',
        data: {
          cname: cname,
          idate: idate,
          iunit: iunit,
          tot_price: tot_price,
          discount: discount,
          iname: iname,
          inum: inum,
          timestamp: timestamp,
          purchase_state: '完成'
        },
        success: function() {
          console.log("update success")
          $(".hint_hint").empty();
          $(".hint_hint").removeClass("hint")
          HINT("交易已儲存，請重新整理")
        },
        contentType: "application/x-www-form-urlencoded",
        dataType: "Text"
      });
    }
  })
}



function ALERT(text) {
  $(".hint_alert").addClass('alert')
  var span_hint = document.createElement("span")
  var strong_text = document.createElement("strong")

  span_hint.setAttribute("class", "closebtn")
  span_hint.setAttribute("onclick", "this.parentElement.style.display='none';")

  span_hint.appendChild(document.createTextNode("×"))
  strong_text.appendChild(document.createTextNode(text))

  document.getElementsByClassName("hint_alert")[0].appendChild(span_hint)
  document.getElementsByClassName("hint_alert")[0].appendChild(strong_text)
}


function HINT(text) {
  $(".hint_hint").addClass('hint')
  var span_hint = document.createElement("span")
  var strong_text = document.createElement("strong")

  span_hint.setAttribute("class", "closebtn")
  span_hint.setAttribute("onclick", "this.parentElement.style.display='none';")

  span_hint.appendChild(document.createTextNode("×"))
  strong_text.appendChild(document.createTextNode(text))

  document.getElementsByClassName("hint_hint")[0].appendChild(span_hint)
  document.getElementsByClassName("hint_hint")[0].appendChild(strong_text)
}
