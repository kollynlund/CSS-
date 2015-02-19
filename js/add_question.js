function addQuestionToNewSurvey() {

	var questions = d3.selectAll('.add-survey-question-block')[0];

	if (questions.length > 0) {
		d3.select(questions[questions.length-1]).select('#add-question').remove();
	}

	if (questions.length < 5) {
		var new_question_number = questions.length + 1;

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
		.append('input').attr('type','text').attr('name','q'+String(new_question_number)+'_text').attr('class','search-input').attr('placeholder','Enter your question here')
		;

		var new_question_section_2 = new_question_sections.append('div').attr('class','search');

		var new_question_type_dropdown = new_question_section_2.append('select').attr('name','q'+String(new_question_number)+'_type').attr('type','select').attr('class','search-input-q-type');
		
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
			.on("click",addQuestionToNewSurvey)
			.append('i').attr('class','fa fa-plus add-q-icon add-question')
			;
		}

		if (questions.length > 0) {
			new_question_sections
			.append('div').attr('class','delete-question clearfix')
			.on("click",function(){deleteQuestionFromNewSurvey(new_question_number);})
			.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question')
			.append('i').attr('class','fa fa-trash')
			;
		}
	}
}


function deleteQuestionFromNewSurvey(question_number) {

	// TODO: Fix the fact that only the middle questions are deleting correctly

	console.log(question_number);
	var questions = d3.selectAll('.add-survey-question-block')[0];
	var number_of_questions = questions.length;
	var current_question = questions[question_number-1];

	for (var i = question_number-1; i < number_of_questions; i++) {
		var question_to_change = d3.selectAll('.add-survey-question-block')[0][i];

		console.log(d3.select(question_to_change)
		.select('div.row')
		.select('div.col-sm-10')
		.select('div.search')
		.select('input.search-input')
		);

		d3.select(question_to_change)
		.select('div.row')
		.attr('id',i)
		.select('div.col-sm-2')
		.select('div.q-number-container')
		.select('p.question-number')
		.html('Q'+String(i))
		;

		d3.select(question_to_change)
		.select('div.row')
		.select('div.col-sm-10')
		.select('div.search')
		.select('input.search-input')
		.attr('name','q'+String(i)+'_text')
		;

		d3.select(question_to_change)
		.select('div.row')
		.select('div.col-sm-10')
		.select('div.search')
		.select('select.search-input-q-type')
		.attr('name','q'+String(i)+'_type')
		;

		d3.select(question_to_change)
		.select('div.row')
		.select('div.col-sm-10')
		.select('div.delete-question')
		.on("click",function(){deleteQuestionFromNewSurvey(i);})
	}

	d3.select(current_question).remove();

	var updated_question_list = d3.selectAll('.add-survey-question-block')[0];
	var updated_number_of_questions = updated_question_list.length;

	console.log(d3.select(updated_question_list[updated_number_of_questions-1]));


	var pre_question_selection = d3.select(updated_question_list[updated_number_of_questions-1])
								 .select('div.row')
								 .select('div.col-sm-10')
								 ;

	if (pre_question_selection.select('#add-question').empty()) {
		pre_question_selection
		.append('button').attr('id','add-question').attr('type','button').attr('value','Add Question').html('Add Question')
		.on("click",addQuestionToNewSurvey)
		.append('i').attr('class','fa fa-plus add-q-icon add-question')
		;
	}

}


function addQuestionToNewSurveySetup() {
	var questions = d3.selectAll('.add-survey-question-block')[0];
	var current_question = questions[questions.length-1];

	d3.select(current_question).select('#add-question').on("click", addQuestionToNewSurvey)
}


function submitNewSurvey() {
	$.fn.serializeObject = function()
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};

	alert(JSON.stringify($('#add-survey-form').serializeObject()));
	
	$.ajax({
		url: 'http://localhost:5000/api/survey',
		contentType: 'application/json',
		type: 'POST',
		data: JSON.stringify($('#add-survey-form').serializeObject()),
	})
	.done(function(data) {
		alert(data);
	})
}







addQuestionToNewSurvey();

d3.select('.confirm-submit-survey-finish-button').on("click",submitNewSurvey);