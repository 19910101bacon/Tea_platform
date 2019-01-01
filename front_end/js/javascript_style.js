(function($) {
 "use strict";
 $('.col').on('mouseover', function(){
   var table1 = $(this).parent().parent().parent();
   var table2 = $(this).parent().parent();
   var column = $(this).data('column') + "";

   $(table2).find("."+column).addClass('hov-column');
   $(table1).find(".row.head ."+column).addClass('hov-column-head');
 });

 $('.col').on('mouseout', function(){
   var table1 = $(this).parent().parent().parent();
	 var table2 = $(this).parent().parent();
	 var column = $(this).data('column') + "";

		$(table2).find("."+column).removeClass('hov-column');
		$(table1).find(".row.head ."+column).removeClass('hov-column-head');
 });
})(jQuery);
