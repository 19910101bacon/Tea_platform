$(document).ready(function() {
  var actions = $("table td:last-child").html();






  $(".add-new").click(function() {
    $(this).attr("disabled", "disabled");
    var index = $("table tbody tr:last-child").index();
    var row = '<tr>' +
      '<td><input type="text" class="form-control" name="index" id="index" ></td>' +
      '<td><input type="text" class="form-control" name="name" id="name"></td>' +
      '<td><input type="text" class="form-control" name="price" id="money"></td>' +
      '<td><input type="text" class="form-control" name="state" id="state"></td>' +
      '<td>' + actions + '</td>' +
      '</tr>';
    $("table").append(row);
    $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
  });

  // Add row on add button click

// 頁面載入時，執行一次表格載入
  Get_items_data();
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

        var HeadName = ["商品編號", "商品名稱(單位)", "價錢", "狀態", "行為"]
        var AttributesClass = ["col col1 h6", "col col2 h6", "col col3 h6", "col col4 h6", "col col5 h6"]
        var AttributesDataColumn = ["col1", "col2", "col3", "col4", "col5"]

        for (i = 0; i < 5; i++) {
          var th = document.createElement("th");
          th.appendChild(document.createTextNode(HeadName[i]));
          th.setAttribute("class", AttributesClass[i]);
          th.setAttribute("data-column", AttributesDataColumn[i]);
          headRow.appendChild(th);
        }
        thead.appendChild(headRow);
        table.appendChild(thead);

        var tBody = document.createElement("tbody");

        var len = result.length;
        for (var i = 0; i < len; i++) {

          var tr = document.createElement("tr");
          for (var j = 0; j < 5; j++) {
            var td = document.createElement("td");

            if (j == 0) {
              td.appendChild(document.createTextNode(i + 1));
              }

              if (j == 1) {
                td.appendChild(document.createTextNode(result[i].Iname));
              }

              if (j == 2) {
                td.appendChild(document.createTextNode(result[i].Price));
              }

              if (j == 3) {
                td.appendChild(document.createTextNode(result[i].State));
              }

              if (j == 4) {
                var para = ["add", "edit", "delete"];
                var icon = ["\uE03B", "\uE254", "\uE872"];

                for (k = 0; k < 3; k++) {
                  var a = document.createElement("a");
                  a.setAttribute("class", para[k]);
                  a.setAttribute("title", para[k].capitalize());
                  a.setAttribute("data-toggle", "tooltip");

                  var ii = document.createElement("i");
                  // var special_sign = document.createTextNode("")
                  // special_sign.innerHTML = icon[k] + special_sign.innerHTML;
                  // ii.appendChild(special_sign.innerHTML);
                  ii.appendChild(document.createTextNode(icon[k]))
                  ii.setAttribute("class", "material-icons");

                  a.appendChild(ii)
                  td.appendChild(a)
                }
              }


              td.setAttribute("class", AttributesClass[j]);
              td.setAttribute("data-column", AttributesDataColumn[j]);
              tr.appendChild(td);
              console.log(tr);
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

  $(document).on("click", ".add", function() {
    var empty = false;
    var input = $(this).parents("tr").find('input[type="text"]');
    var data = [];
    var flag = 0;
    var typing_Iname;
    var typing_Price;
    var typing_State;

    Check_all_input();

    function Check_all_input(callback) {
      input.each(function(i, value) {
        if (i == 1) {
          typing_Iname = $(this).val();
        }
        if (i == 2) {
          typing_Price = $(this).val();
        }
        if (i == 3) {
          typing_State = $(this).val();
        }
      })

      input.each(function(i, value) {
        Check_empty_value($(this));
        if (i == 1) {
          Get_from_API($(this).val());

          function Get_from_API(typing_Iname, typing_Price, typing_State, callback) {
            $.ajax("http://34.226.147.247:3000/items", {
              type: 'GET',
              success: function(result) {
                var len = result.length;
                // flag = 0; //To record whether typing_Iname matches the data from database or not
                for (var i = 0; i < len; i++) {
                  if (typing_Iname == result[i].Iname && typing_Price == result[i].Price && typing_State == result[i].State) {
                    flag = 1;
                    alert("Bingo");
                  }
                  if (typing_Iname == result[i].Iname && flag == 0) {
                    flag = 2;
                    Post_to_update(typing_Iname, typing_Price);
                  }
                }
                if (!flag) { // alert("Not match!");
                  Post_to_insert();
                }
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
                alert(textStatus, errorThrown);
              }
            });
          }
        }

        function Check_empty_value(cell) {
          if (!cell.val()) {
            cell.addClass("error");
            empty = true;
          } else {
            cell.removeClass("error");
            data.push(cell.val())
          }
        }
      })
    };

    function Post_to_insert() {
      // alert(flag);
      if (!flag) {
        var array_data = data.toString().split(",");
        $.ajax({
          type: 'POST',
          url: 'http://34.226.147.247:3000/items',
          data: {
            Iname: array_data[1],
            Price: parseInt(array_data[2]),
            State: array_data[3]
            // Iname: "123",
            // Price: 123,
            // State: "123"
          },
          success: function(data1) {
            alert(data1);
          },
          contentType: "application/x-www-form-urlencoded",
          dataType: "Text"
        });
      }
    }

    function Post_to_update(typing_Iname, typing_Price) {
      // alert(flag);
      if (flag == 2) {
        var array_data = data.toString().split(",");
        $.ajax({
          type: 'POST',
          url: 'http://34.226.147.247:3000/items/update',
          data: {
            Iname: typing_Iname,
            Price: parseInt(array_data[2])
          },
          success: function(data1) {
            alert(data1);
          },
          contentType: "application/x-www-form-urlencoded",
          dataType: "Text"
        });
      }
    }


    $(this).parents("tr").find(".error").first().focus();
    if (!empty) {
      input.each(function() {
        $(this).parent("td").html($(this).val());
      });
      $(this).parents("tr").find(".add, .edit").toggle();
      $(".add-new").removeAttr("disabled");
    }
  });
  // Edit row on edit button click
  $(document).on("click", ".edit", function(err, result) {
    $(this).parents("tr").find("td:not(:last-child)").each(function() {
      // console.log($(this).text());
      $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');

    });

    $(this).parents("tr").find(".add, .edit").toggle();
    $(".add-new").attr("disabled", "disabled");
  });
  // Delete row on delete button click
  $(document).on("click", ".delete", function() {
    $(this).parents("tr").remove();
    $(".add-new").removeAttr("disabled");
  });
});


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
