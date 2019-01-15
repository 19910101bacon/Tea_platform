$(document).ready(function() {

  Display_stock_data()


  /**
   * Chosen: Multiple Dropdown
   */
  window.WDS_Chosen_Multiple_Dropdown = {};
  (function(window, $, that) {

    // Constructor.
    that.init = function() {
      that.cache();

      if (that.meetsRequirements) {
        that.bindEvents();
      }
    };

    // Cache all the things.
    that.cache = function() {
      that.$c = {
        window: $(window),
        theDropdown: $('.dropdown'),
      };
    };

    // Combine all events.
    that.bindEvents = function() {
      that.$c.window.on('load', that.applyChosen);
    };

    // Do we meet the requirements?
    that.meetsRequirements = function() {
      return that.$c.theDropdown.length;
    };

    // Apply the Chosen.js library to a dropdown.
    // https://harvesthq.github.io/chosen/options.html
    that.applyChosen = function() {
      that.$c.theDropdown.chosen({
        inherit_select_classes: true,
        width: '300px',
      });
    };

    // Engage!
    $(that.init);

  })(window, jQuery, window.WDS_Chosen_Multiple_Dropdown);

  $('.form-control-chosen').chosen({
    // Chosen options here
  });

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
});



function Display_stock_data() {
  $.ajax("http://34.226.147.247:3000/stocks/shelf", {
    type: 'GET',
    success: function(result) {
      var iname = [];
      for (i = 0; i < result.length; i++) {
        iname.push(result[i].iname)
      }

      var iname_set = GetUnique(iname)

      var select_form = document.createElement("select");
      select_form.setAttribute("data-placeholder", "請選擇購買商品，可複選");
      select_form.setAttribute("name", "tags[]");
      select_form.setAttribute("class", "chosen-select");
      select_form.setAttribute("multiple", "multiple");


      for (j = 0; j < iname_set.length; j++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", iname_set[j])
        opt.appendChild(document.createTextNode(iname_set[j]));
        select_form.appendChild(opt)
        console.log(select_form)
      }
      document.getElementById("stock-form").appendChild(select_form);

      document.getElementById('output').innerHTML = location.search;
      $(".chosen-select").chosen();

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
