



$( "#yesno" ).click(function() {
	$( this ).addClass( "btn-active" );
	$( "#scale" ).removeClass( "btn-active" );
});

$( "#scale" ).click(function() {
	$( this ).addClass( "btn-active" );
	$( "#yesno" ).removeClass( "btn-active" );
});