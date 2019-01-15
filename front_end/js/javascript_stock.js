$(document).ready(function() {
  window.ans1_old = null;
  window.ans2_old = null;
  window.ans3_old = null;
  window.ans4_old = null;
  window.ans5_old = null;

  Get_stocks_data();
  Delete_data();
  Save_data();


  // Display_select_data();
  // Edit_data();
  // refresh document
  $('#Modal').on('show.bs.modal', function(e) {
    document.getElementById("iname").value = "";
    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("money").value = "";
  });
})


function Edit_data() {
  $.ajax("http://34.226.147.247:3000/stocks/shelf", {
    type: 'GET',
    success: function(result) {
      $(document).on("click", ".edit", function() {
        var tr_handle = $(this).closest('tr')
        ans1_old = tr_handle.find(".col2").text()
        ans2_old = tr_handle.find(".col3").text()
        ans3_old = tr_handle.find(".col4").text()
        ans4_old = tr_handle.find(".col5").text()
        ans5_old = tr_handle.find(".col6").text()

        // ans1
        var former_iname = document.getElementById("iname");
        if (former_iname) {
          document.getElementById("iname-form").removeChild(former_iname);
        }
        var iname = [];
        for (i = 0; i < result.length; i++) {
          iname.push(result[i].iname)
        }
        var iname_set = GetUnique(iname)
        var select_form = document.createElement("select");
        select_form.setAttribute("id", "iname");
        select_form.setAttribute("class", "col-sm-7");
        select_form.setAttribute("name", "answer1");

        for (j = 0; j < iname_set.length; j++) {
          var opt = document.createElement("option");
          if (iname_set[j] == ans1_old) {
            opt.setAttribute("selected", "selected")
          }
          opt.appendChild(document.createTextNode(iname_set[j]));
          select_form.appendChild(opt)
        }
        document.getElementById("iname-form").appendChild(select_form);

        // ans2
        var former_date = document.getElementById("date");
        if (former_date) {
          document.getElementById("date-form").removeChild(former_date);
        }
        var date = [];
        for (i = 0; i < result.length; i++) {
          if (result[i].iname == ans1_old) {
            date.push(result[i].date)
          }
        }
        var date_set = GetUnique(date)
        var select_form = document.createElement("select");
        select_form.setAttribute("id", "date");
        select_form.setAttribute("class", "col-sm-7");
        select_form.setAttribute("name", "answer2");

        for (j = 0; j < date_set.length; j++) {
          var opt = document.createElement("option");
          if (date_set[j] == ans2_old) {
            opt.setAttribute("selected", "selected")
          }
          opt.appendChild(document.createTextNode(date_set[j]));
          select_form.appendChild(opt)
        }
        document.getElementById("date-form").appendChild(select_form);

        // ans3
        document.getElementById("amount").value = ans3_old;

        // ans4
        document.getElementById("money").value = ans4_old;

        // ans5
        if (ans5_old == "下架") {
          document.getElementById("stock_state").selectedIndex = "1";
        }
      })
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      alert(textStatus, errorThrown);
    }

  })
}

function Display_select_data() {
  $.ajax("http://34.226.147.247:3000/stock/shelf", {
    type: 'GET',
    success: function(result) {
      var iname = [];
      for (i = 0; i < result.length; i++) {
        iname.push(result[i].iname)
      }

      var iname_set = GetUnique(iname)
      var select_form = document.createElement("select");
      select_form.setAttribute("id", "iname");
      select_form.setAttribute("class", "col-sm-7");
      select_form.setAttribute("name", "answer1");

      for (j = 0; j < iname_set.length; j++) {
        var opt = document.createElement("option");
        opt.appendChild(document.createTextNode(iname_set[j]));
        select_form.appendChild(opt)
      }
      document.getElementById("iname-form").appendChild(select_form);

      select_form.addEventListener('change', function() {
        var former_date = document.getElementById("date");
        if (former_date) {
          document.getElementById("date-form").removeChild(former_date);
        }

        var date = [];
        for (i = 0; i < result.length; i++) {
          if (result[i].iname == $("#iname").val()) {
            date.push(result[i].date)
          }
        }
        var date_set = GetUnique(date)
        var select_form = document.createElement("select");
        select_form.setAttribute("id", "date");
        select_form.setAttribute("class", "col-sm-7");
        select_form.setAttribute("name", "answer2");

        for (j = 0; j < date_set.length; j++) {
          var opt = document.createElement("option");
          opt.appendChild(document.createTextNode(date_set[j]));
          select_form.appendChild(opt)
        }
        document.getElementById("date-form").appendChild(select_form);
      });



    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      alert(textStatus, errorThrown);
    }
  });
}

// ok
function Save_data() {
  $(document).on("click", "#save", function() {
    var ans1 = document.forms["Form"]["answer1"].value;
    var ans2 = document.forms["Form"]["answer2"].value;
    var ans3 = document.forms["Form"]["answer3"].value;
    var ans4 = document.forms["Form"]["answer4"].value;

    if (ans1 == null || ans3 == "") {
      alert("請填寫商品名稱，如『大禹嶺』");
      return false;
    }
    if (ans2 == null || ans2 == "") {
      alert("請填寫進貨日期，如『2019/01/01』");
      return false;
    }
    if (ans3 == null || ans3 == "" || !Number.isInteger(Number(ans3))) {
      alert("請填寫進貨量，並填寫數字，如30");
      return false;
    }
    if (ans4 == null || ans4 == "" || !Number.isInteger(Number(ans4))) {
      alert("請填寫價錢，並填寫數字");
      return false;
    }
    var ans5 = document.forms["Form"]["answer5"].value;

    $.ajax({
      type: 'GET',
      url: 'http://34.226.147.247:3000/stocks/shelf',
      success: function(result) {
        var len = result.length;
        var flag = 0;
        // flag = 0; //To record whether typing_Iname matches the data from database or not
        for (var i = 0; i < len; i++) {
          if (result[i].iname == ans1_old && result[i].date == ans2_old) {
            alert('此產品已在表單中，若要編輯該品項請去該項目編輯')
            flag = flag + 1
          }
        }


        if (flag == 0) {
          $.ajax({
            type: 'PUT',
            url: 'http://34.226.147.247:3000/stock/update',
            data: {
              iname_old: ans1_old,
              date_old: ans2_old,
              amount_old: ans3_old,
              money_old: ans4_old,
              stock_state_old: ans5_old,
              iname: ans1,
              date: ans2,
              amount: ans3,
              money: ans4,
              stock_state: ans5
            },
            success: function() {
              console.log("update success")
              alert("已儲存，請重新整理")
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "Text"
          });
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
        alert(textStatus, errorThrown);
      }


    })

    $('.close').click()


  });
}

// ok
function Get_stocks_data() {
  $.ajax("http://34.226.147.247:3000/stocks/shelf", {
    type: 'GET',
    success: function(result) {
      // Create table
      var table = document.createElement("table");
      table.setAttribute("class", "table table-bordered")

      var thead = document.createElement("thead");
      var tbody = document.createElement("tbody");
      var headRow = document.createElement("tr");

      var HeadName = ["商品編號", "庫存名稱", "進貨日期", "進貨量", "進貨成本", "狀態", "行為"]
      var AttributesClass = ["col col1", "col col2", "col col3", "col col4", "col col5", "col col6", "col col7"]
      var AttributesDataColumn = ["col1", "col2", "col3", "col4", "col5", "col6", "col7"]

      for (i = 0; i < 7; i++) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(HeadName[i]));
        th.setAttribute("class", "h2 " + AttributesClass[i]);
        th.setAttribute("data-column", AttributesDataColumn[i]);
        headRow.appendChild(th);
      }
      thead.appendChild(headRow);
      table.appendChild(thead);

      var tBody = document.createElement("tbody");

      var len = result.length;
      for (var i = 0; i < len; i++) {

        var tr = document.createElement("tr");
        for (var j = 0; j < 7; j++) {
          var td = document.createElement("td");

          if (j == 0) {
            td.appendChild(document.createTextNode(i + 1));
          }

          if (j == 1) {
            td.appendChild(document.createTextNode(result[i].iname));
          }

          if (j == 2) {
            td.appendChild(document.createTextNode(result[i].date));
          }

          if (j == 3) {
            td.appendChild(document.createTextNode(result[i].amount));
          }

          if (j == 4) {
            td.appendChild(document.createTextNode(result[i].money));
          }

          if (j == 5) {
            td.appendChild(document.createTextNode(result[i].stock_state));
          }

          if (j == 6) {
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


          td.setAttribute("class", "h3 " + AttributesClass[j]);
          td.setAttribute("data-column", AttributesDataColumn[j]);
          tr.appendChild(td);
        }
        tBody.appendChild(tr);
      }
      table.appendChild(tBody);
      document.getElementById("table-wrapper").appendChild(table)

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      alert(textStatus, errorThrown);
    }
  });
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
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

// ok
function Delete_data() {
  $(document).on("click", ".delete", function() {
      var tr_handle = $(this).closest('tr')
      ans1_old = tr_handle.find(".col2").text()
      ans2_old = tr_handle.find(".col3").text()
      ans3_old = tr_handle.find(".col4").text()
      ans4_old = tr_handle.find(".col5").text()
      ans5_old = tr_handle.find(".col6").text()
      console.log(ans1_old)
      console.log(ans2_old)
      console.log(ans3_old)
      console.log(ans4_old)
      console.log(ans5_old)

    $.ajax({
      type: 'PUT',
      url: 'http://34.226.147.247:3000/stock/update',
      data: {
        iname_old: ans1_old,
        date_old: ans2_old,
        amount_old: ans3_old,
        money_old: ans4_old,
        stock_state_old: ans5_old,
        iname: '',
        date: '',
        amount: '',
        money: 999,
        stock_state: '刪除'
      },
      success: function() {
        console.log("update success")
        alert("已刪除，請重新整理")
      },
      contentType: "application/x-www-form-urlencoded",
      dataType: "Text"
    });
  })
}
