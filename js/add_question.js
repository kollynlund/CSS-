function addQuestion() {
	console.log("fooqueue");

	var questions = d3.selectAll('.add-survey-question-block')[0];
	var current_question = questions[questions.length-1];

	d3.select(current_question).select('#add-question').remove();

	if (questions.length < 5) {
		var new_question_number = questions.length + 1;

		console.log(d3.select('.add-survey-question-container'));

		var new_question_row = d3.select('.add-survey-question-container')
						   .append('div').attr('class','question-block  add-survey-question-block').attr('id',String(new_question_number))
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

		if (questions.length < 4) {
			new_question_sections
			.append('button').attr('id','add-question').attr('type','button').attr('value','Add Question').html('Add Question')
			.on("click",addQuestion)
			.append('i').attr('class','fa fa-plus add-q-icon add-question')
			;
		}

		new_question_sections
		.append('div').attr('class','delete-question clearfix')
		.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question')
		.append('i').attr('class','fa fa-trash')
		;
	}
}

function addQuestionSetup() {
	var questions = d3.selectAll('.add-survey-question-block')[0];
	var current_question = questions[questions.length-1];

	d3.select(current_question).select('#add-question').on("click", addQuestion)
}

addQuestionSetup();