function loadSurveys(error, surveys) {
	var surveys_container = d3.select('.surveys');
	surveys.objects.forEach(function(d) {
		var new_survey = surveys_container
						 .append('div').attr('class', 'survey col-sm-4')
						 ;
		var new_survey_main = new_survey
							  .append("div").attr("class", 'survey-main')
							  ;

		new_survey_main
		.append('div').attr('class','survey-name')
		.html(d.survey_name);

		var new_survey_secondary = new_survey
								   .append("div").attr("class", 'survey-secondary')
								   ;
		if (d.is_live) {
			new_survey_secondary
			.append('p').attr('class','live-txt')
			.html('<i class="fa fa-globe live-icon"></i>This survey is live')
			;
		}

		new_survey_secondary
		.append('p').attr('class','view-data-txt')
		.append('a').attr('href','#').attr('id','tryme').attr('data-toggle','modal').attr('data-target','#view-data-modal').on("click",function(){layoutSurveyAnalyticsModal(d.id, [d.q1_text, d.q2_text, d.q3_text, d.q4_text, d.q5_text]);})
		.html('<i class="fa fa-bar-chart data-icon"></i>View data')
		;

		new_survey_secondary
		.append('a').attr('class','edit-survey-link').attr('href','#')
		.append('p').attr('class','edit-icon-txt').attr('data-toggle','modal').attr('data-target','#edit-quiz-modal')
		.html('<i class="fa fa-pencil edit-icon"></i>Edit')
		;

		var survey_id_element = new_survey_main
								.append('div').attr('survey_id',d.id)
								;

		new_survey_secondary
		.select('a.edit-survey-link')
		.on("click",function() {setupEditSurveyModal(survey_id_element.attr('survey_id'));})
	})
	;
}


function setupEditSurveyModal(survey_id) {
	queue()
	.defer(d3.json,'http://localhost:5000/api/survey/'+survey_id)
	.await(loadEditSurveyQuestions)
	;
}


function loadEditSurveyQuestions(error, survey_data) {
	d3.selectAll('.edit-survey-question-block')
	.remove()
	;

	d3.select('.edit-survey-modal-survey-name')
	.select('input')
	.attr('value',survey_data.survey_name)
	;

	function addQuestion(new_question_number, number_of_questions) {
		var new_question_row = d3.select('.edit-survey-question-container')
						   .append('div').attr('class','question-block  edit-survey-question-block').attr('id',String(new_question_number))
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
		.append('input').attr('type','text').attr('name','q'+String(new_question_number)+'_text').attr('class','search-input').attr('placeholder','Enter your question here').attr('value',survey_data['q'+String(new_question_number)+'_text'])
		;

		var new_question_section_2 = new_question_sections.append('div').attr('class','search');

		var new_question_type_dropdown = new_question_section_2.append('select').attr('name','q'+String(new_question_number)+'_type').attr('type','select').attr('class','search-input-q-type');

		var yes_no = new_question_type_dropdown
					 .append('option').attr('value','Yes / No').html(' Yes / No');

		var scale_1_5 = new_question_type_dropdown
						.append('option').attr('value','Scale 1-5').html(' Scale 1-5');

		if (survey_data['q'+String(new_question_number)+'_type'] == 'Scale 1-5') {
			scale_1_5.attr('selected','');
		}
		if (survey_data['q'+String(new_question_number)+'_type'] == 'Yes / No') {
			yes_no.attr('selected','');
		}


		new_question_section_2
		.append('i').attr('class','fa down-arrow fa-sort-desc')

		if (new_question_number == number_of_questions && new_question_number < 5) {
			new_question_sections
			.append('button').attr('id','add-question').attr('type','button').attr('value','Add Question').html('Add Question')
			.on("click",addBrandNewQuestion)
			.append('i').attr('class','fa fa-plus add-q-icon add-question')
			;
		}

		if (new_question_number != 1) {
			new_question_sections
			.append('div').attr('class','delete-question clearfix')
			.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question').on("click",function(){deleteQuestionFromExistingSurvey(new_question_number)})
			.append('i').attr('class','fa fa-trash')
			;
		}
	}

	var lastQuestion = 5;
	if (!survey_data.q5_text) {lastQuestion = 4;}
	if (!survey_data.q4_text) {lastQuestion = 3;}
	if (!survey_data.q3_text) {lastQuestion = 2;}
	if (!survey_data.q2_text) {lastQuestion = 1;}

	for (var i = 1; i <= lastQuestion; i++) {
		addQuestion(i,lastQuestion);
	}
}


function addBrandNewQuestion() {
	var questions = d3.selectAll('.edit-survey-question-block')[0];
	var current_question = questions[questions.length-1];

	d3.select(current_question).select('#add-question').remove();

	if (questions.length < 5) {
		var new_question_number = questions.length + 1;

		var new_question_row = d3.select('.edit-survey-question-container')
						   .append('div').attr('class','question-block  edit-survey-question-block').attr('id',String(new_question_number))
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
			.on("click",addBrandNewQuestion)
			.append('i').attr('class','fa fa-plus add-q-icon add-question')
			;
		}

		new_question_sections
		.append('div').attr('class','delete-question clearfix')
		.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question').on("click",function(){deleteQuestionFromExistingSurvey(new_question_number);})
		.append('i').attr('class','fa fa-trash')
		;
	}
}


function deleteQuestionFromExistingSurvey(question_number) {
	var questions = d3.selectAll('.edit-survey-question-block')[0];
	var number_of_questions = questions.length;
	var current_question = questions[question_number-1];

	for (var i = question_number-1; i < number_of_questions; i++) {
		var question_to_change = d3.selectAll('.edit-survey-question-block')[0][i];

		d3.select(question_to_change).attr('id',String(i));

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
		.on("click",function(){deleteQuestionFromExistingSurvey(i);})
	}

	d3.select(current_question).remove();

	var updated_question_list = d3.selectAll('.edit-survey-question-block')[0];
	var updated_number_of_questions = updated_question_list.length;

	var pre_question_selection = d3.select(updated_question_list[updated_number_of_questions-1])
								 .select('div.row')
								 .select('div.col-sm-10')
								 ;

	if (pre_question_selection.select('#add-question').empty()) {
		pre_question_selection
		.append('button').attr('id','add-question').attr('type','button').attr('value','Add Question').html('Add Question')
		.on("click",addBrandNewQuestion)
		.append('i').attr('class','fa fa-plus add-q-icon add-question')
		;
	}
}


function layoutSurveyAnalyticsModal(survey_id, survey_questions) {
	var analytics_table = d3.select("#survey-analytics-table");

	for (var i = 0; i < 5; i++) {
		if (survey_questions[i]) {
			var new_row = analytics_table.select('tbody')
										 .append('tr')
										 .attr('id','question_'+String(i+1)+'_data');
			new_row.append('td').html(survey_questions[i]);
			new_row.append('td').html("Kneaders Place");
		}
	}


	
	queue()
	.defer(d3.json,'http://localhost:5000/api/answer?q={%22filters%22:[{%22name%22:%20%22survey_id%22,%20%22op%22:%20%22==%22,%20%22val%22:%20'+String(survey_id)+'}]}')
	.await(addDataToSurveyAnalyticsModal)
	;
}


function addDataToSurveyAnalyticsModal(error, survey_answers) {
	var q1_answers = [];
	var q2_answers = [];
	var q3_answers = [];
	var q4_answers = [];
	var q5_answers = [];

	for (var i = 0; i < survey_answers.objects.length; i++) {
		q1_answers.push(survey_answers.objects[i]['q1_answer']);
		q2_answers.push(survey_answers.objects[i]['q2_answer']);
		q3_answers.push(survey_answers.objects[i]['q3_answer']);
		q4_answers.push(survey_answers.objects[i]['q4_answer']);
		q5_answers.push(survey_answers.objects[i]['q5_answer']);
	}

	q1_sum = 0;
	q1_responses = 0;
	for (var q1 = 0; q1 < q1_answers.length; q1++) {
		if (q1_answers[q1] != null) {
			q1_sum += q1_answers[q1];
			q1_responses += 1;
		}
	}
	q1_average = q1_sum / q1_responses;

	q2_sum = 0;
	q2_responses = 0;
	for (var q2 = 0; q2 < q2_answers.length; q2++) {
		if (q2_answers[q2] != null) {
			q2_sum += q2_answers[q2];
			q2_responses += 1;
		}
	}
	q2_average = q2_sum / q2_responses;

	q3_sum = 0;
	q3_responses = 0;
	for (var q3 = 0; q3 < q3_answers.length; q3++) {
		if (q3_answers[q3] != null) {
			q3_sum += q3_answers[q3];
			q3_responses += 1;
		}
	}
	q3_average = q3_sum / q3_responses;

	q4_sum = 0;
	q4_responses = 0;
	for (var q4 = 0; q4 < q4_answers.length; q4++) {
		if (q4_answers[q4] != null) {
			q4_sum += q4_answers[q4];
			q4_responses += 1;
		}
	}
	q4_average = q4_sum / q4_responses;

	q5_sum = 0;
	q5_responses = 0;
	for (var q5 = 0; q5 < q5_answers.length; q5++) {
		if (q5_answers[q5] != null) {
			q5_sum += q5_answers[q5];
			q5_responses += 1;
		}
	}
	q5_average = q5_sum / q5_responses;

	console.log(q1_average, q2_average);
	question_averages = [q1_average, q2_average, q3_average, q4_average, q5_average];

	for (var j = 1; j < 6; j++) {
		var data_row = d3.select('#question_'+String(j)+'_data');
		data_row.append('td').html(String(question_averages[j-1]));
	}
}






// TODO: Implement question delete functionality for the Edit menu
// TODO: Implement edit question API call







queue()
.defer(d3.json, 'http://localhost:5000/api/survey')
.await(loadSurveys)
;