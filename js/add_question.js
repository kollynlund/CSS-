function addQuestionSetup() {
	console.log(d3.select('#add-quiz-modal'));
	var questions = d3.selectAll('.question-block');
	console.log(questions);
	var current_question = questions[-1];

	current_question.select('#add-question').on("click", function(){
		current_question.select('#add-question').remove();

		var new_question_number = questions.length + 1;
		var new_question_row = d3.select('.question-container')
						   .append('div').attr('class','question-block').attr('id',String(new_question_number))
						   .append('div').attr('class','row')
						   ;

		new_question_row
		.append('div').attr('class','col-sm-2')
		.append('div').attr('class','q-number-container')
		.append('p').attr('class','question-number').html('Q'+String(new_question_number))
		;

		var new_question_sections = new_question_row.append('div').attr('class','col-sm-10');

		new_question_sections
		.append('div').attr('class','search')
		.append('input').attr('type','text').attr('class','search-input').attr('placeholder','Enter your question here')
		;

		var new_question_section_2 = new_question_sections.append('div').attr('class','search');

		var new_question_type_dropdown = new_question_section_2.append('select').attr('type','select').attr('class','search-input-q-type');
		
		new_question_type_dropdown
		.append('option').attr('class','first-option').html(' Question Type ');

		new_question_type_dropdown
		.append('option').attr('value','Yes / No').html(' Yes / No');

		new_question_type_dropdown
		.append('option').attr('value','Scale 1-5').html(' Scale 1-5');

		new_question_section_2
		.append('i').attr('class','fa down-arrow fa-sort-desc')

		new_question_sections
		.append('button').attr('id','add-question').attr('type','button').attr('value','Add Question').html('Add Question')
		.on("click",addQuestionSetup)
		.append('i').attr('class','fa fa-plus add-q-icon add-question')
		;

		new_question_sections
		.append('div').attr('class','delete-question clearfix')
		.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question')
		.append('i').attr('class','fa fa-trash')
		;
	})
}

// d3.select('#tryme').on("click",addQuestionSetup);
addQuestionSetup();