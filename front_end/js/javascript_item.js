$(document).ready(function() {
  window.ans1_old = null;
  window.ans2_old = null;
  window.ans3_old = null;
  window.ans4_old = null;
  window.ans5_old = null;

  Get_items_data();
  Display_select_data();
  Save_data($("#iname").val(), $("#date").val());
  Edit_data();
  Delete_data();
  // refresh document
  $('#Modal').on('show.bs.modal', function(e) {
    document.getElementById("unit").value = "";
    document.getElementById("price").value = "";
  });

  // $('#save').click(function() {
  //   location.reload();
  // });



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
        document.getElementById("unit").value = ans3_old;

        // ans4
        document.getElementById("price").value = ans4_old;

        // ans5
        if (ans5_old == "下架") {
          document.getElementById("state").selectedIndex = "1";
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
  $.ajax("http://34.226.147.247:3000/stocks/shelf", {
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

function Save_data() {
  $(document).on("click", "#save", function() {
    console.log(ans1_old)
    console.log(ans2_old)
    var ans3 = document.forms["Form"]["answer3"].value;
    var ans4 = document.forms["Form"]["answer4"].value;

    if (ans3 == null || ans3 == "") {
      alert("請填寫單位，如『半斤』");
      return false;
    }
    if (ans4 == null || ans4 == "" || !Number.isInteger(Number(ans4))) {
      alert("請填寫價錢，並填寫數字");
      return false;
    }
    if (document.getElementById("date") == null) {
      alert("請透過點選『商品名稱』來選擇『進貨日期』")
    } else {
      var ans2 = document.forms["Form"]["answer2"].value;
      var ans1 = document.forms["Form"]["answer1"].value;
      var ans5 = document.forms["Form"]["answer5"].value;
    }

    $.ajax({
      type: 'GET',
      url: 'http://34.226.147.247:3000/items/shelf',
      success: function(result) {
        var len = result.length;
        var flag = 0;
        // flag = 0; //To record whether typing_Iname matches the data from database or not
        for (var i = 0; i < len; i++) {
          if (result[i].iname == ans1_old && result[i].date == ans2_old && result[i].unit == ans3_old) {
            continue;
          }

          if (result[i].iname == ans1 && result[i].date == ans2 && result[i].unit == ans3) {
            alert('此產品已在表單中，若要編輯該品項請去該項目編輯')
            flag = flag + 1
          }
        }

        if (flag == 0) {
          $.ajax({
            type: 'PUT',
            url: 'http://34.226.147.247:3000/items/update',
            data: {
              iname_old: ans1_old,
              date_old: ans2_old,
              unit_old: ans3_old,
              price_old: ans4_old,
              state_old: ans5_old,
              iname: ans1,
              date: ans2,
              unit: ans3,
              price: ans4,
              state: ans5
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

function Get_items_data() {
  $.ajax("http://34.226.147.247:3000/items/shelf", {
    type: 'GET',
    success: function(result) {
      // Create table
      var table = document.createElement("table");
      table.setAttribute("class", "table table-bordered")

      var thead = document.createElement("thead");
      var tbody = document.createElement("tbody");
      var headRow = document.createElement("tr");

      var HeadName = ["商品編號", "商品名稱", "進貨日期", "單位", "價錢", "狀態", "行為"]
      var AttributesClass = ["col col1 h6", "col col2 h6", "col col3 h6", "col col4 h6", "col col5 h6", "col col6 h6", "col col7 h6"]
      var AttributesDataColumn = ["col1", "col2", "col3", "col4", "col5", "col6", "col7"]

      for (i = 0; i < 7; i++) {
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
            td.appendChild(document.createTextNode(result[i].unit));
          }

          if (j == 4) {
            td.appendChild(document.createTextNode(result[i].price));
          }

          if (j == 5) {
            td.appendChild(document.createTextNode(result[i].state));
          }

          if (j == 6) {
            var para = ["edit", "delete"];
            var icon = ["\uE254", "\uE872"];

            for (k = 0; k < 2; k++) {
              var but = document.createElement("button");
              but.setAttribute("class", para[k]);
              but.setAttribute("class", "h3");
              but.setAttribute("type", "button");
              if (k == 0) {
                but.setAttribute("data-toggle", "modal");
                but.setAttribute("data-target", "#Modal");
              }

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


function Delete_data() {
  $(document).on("click", ".delete", function() {
        $(document).on("click", ".edit", function() {
          var tr_handle = $(this).closest('tr')
          ans1_old = tr_handle.find(".col2").text()
          ans2_old = tr_handle.find(".col3").text()
          ans3_old = tr_handle.find(".col4").text()
          ans4_old = tr_handle.find(".col5").text()
          ans5_old = tr_handle.find(".col6").text()
        })

    $.ajax({
      type: 'PUT',
      url: 'http://34.226.147.247:3000/items/update',
      data: {
        iname_old: ans1_old,
        date_old: ans2_old,
        unit_old: ans3_old,
        price_old: ans4_old,
        state_old: ans5_old,
        iname: '',
        date: '',
        unit: '',
        price: 999,
        state: '刪除'
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
