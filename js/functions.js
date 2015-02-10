



$( "#yesno" ).click(function() {
	$( this ).addClass( "btn-active" );
	$( "#scale" ).removeClass( "btn-active" );
});

$( "#scale" ).click(function() {
	$( this ).addClass( "btn-active" );
	$( "#yesno" ).removeClass( "btn-active" );
});


$('#add-question').click(function(){
	$('.question-container').after( "<div class='question-container'><div class='question-block'><div class='row'><div class='col-sm-2'><div class='q-number-container'><p class='question-number'>Q1</p><div class='delete-question clearfix'><button type='button' data-toggle='modal' data-target='#confirm-delete-question' value='Delete Question'><i class='fa fa-trash'></i></button></div></div></div><div class='col-sm-10'><input type='text' placeholder='Enter your first question here'><button class="" id='yesno' type='button' value='Yes or No'>Yes / No</button><button class="" id='scale' type='button' value='Scale'>Scale 1 - 5</button><br></div></div><div class='row'><div class='col-sm-6 col-sm-offset-6'><div class='end-btns'><button id='add-question' type='button' value='Add Question'>Add question <i class='fa fa-plus add-q-icon'></i></button><button type='button' data-toggle='modal' data-target='#confirm-finish-survey' value='Finish Survey'>Finish Survey <i class='fa fa-check finish-s-icon'></i></button></div></div></div></div>" );
});
