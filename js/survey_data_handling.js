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
		.append('a').attr('href','#').attr('id','tryme').attr('data-toggle','modal').attr('data-target','#view-data-modal')
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
			scale_1_5.attr('selected');
		}
		if (survey_data['q'+String(new_question_number)+'_type'] == 'Yes / No') {
			yes_no.attr('selected');
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

		new_question_sections
		.append('div').attr('class','delete-question clearfix')
		.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question')
		.append('i').attr('class','fa fa-trash')
		;
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
		.append('button').attr('type','button').attr('data-toggle','modal').attr('data-target','#confirm-delete-question').attr('value','Delete Question')
		.append('i').attr('class','fa fa-trash')
		;
	}
}



queue()
.defer(d3.json, 'http://localhost:5000/api/survey')
.await(loadSurveys)
;