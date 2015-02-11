
$( "#yesno" ).click(function() {
	$( this ).addClass( "btn-active" );
	$( "#scale" ).removeClass( "btn-active" );
});

$( "#scale" ).click(function() {
	$( this ).addClass( "btn-active" );
	$( "#yesno" ).removeClass( "btn-active" );
});



$('.dropdown-toggle').click(function(){
  $(this).next('.dropdown').toggle();
});

$(document).click(function(e) {
  var target = e.target;
  if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
    $('.dropdown').hide();
  }


});


