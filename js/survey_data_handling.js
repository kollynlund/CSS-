var surveystuff = d3.json('http://localhost:5000/api/survey', function(data){ var surveys =  data; });



function loadSurveys(error, surveys) {
	var surveys_container = d3.select('.surveys');
	surveys.objects.forEach(function(d) {
		var new_survey = surveys_container
						 .append('div')
						 .attr('class', 'survey col-sm-4')
						 ;
		var new_survey_main = new_survey
							  .append("div")
							  .attr("class", 'survey-main')
							  ;

		new_survey_main
		.append('div')
		.attr('class','survey-name')
		.html(d.survey_name);

		/*
		new_survey_main
		.append('div')
		.attr('class','survey-image')
		.append('i')
		.attr('class','fa fa-picture-o');
		*/

		var new_survey_secondary = new_survey
								   .append("div")
								   .attr("class", 'survey-secondary')
								   ;
		if (d.is_live) {
			new_survey_secondary
			.append('p')
			.attr('class','live-txt')
			.html('<i class="fa fa-globe live-icon"></i>This survey is live')
			;
		}

		new_survey_secondary
		.append('p')
		.attr('class','view-data-txt')
		.html('<i class="fa fa-bar-chart data-icon"></i>View data')
		;

		new_survey_secondary
		.append('a')
		.attr('class','edit-survey-link')
		.attr('href','#')
		.append('p')
		.attr('class','edit-icon-txt')
		.attr('data-toggle','modal')
		.attr('data-target','#edit-quiz-modal')
		.html('<i class="fa fa-pencil edit-icon"></i>Edit')
		;


	})
	;
}







queue()
.defer(d3.json, 'http://localhost:5000/api/survey')
.await(loadSurveys)
;