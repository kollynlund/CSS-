var surveys = d3.json('http://localhost:5000/api/survey', function(data){ return data; });



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

		new_survey_secondary
		.append('p')
		.attr('class','live-txt')
		.html('This survey is live')
		.append('i')
		.attr('class','fa fa-globe live-icon')
		;

		new_survey_secondary
		.append('p')
		.attr('class','view-data-txt')
		.html('View data')
		.append('i')
		.attr('class','fa fa-bar-chart data-icon')
		;

		new_survey_secondary
		.append('p')
		.attr('class','edit-icon-txt')
		.html('Edit')
		.append('i')
		.attr('class','fa fa-pencil edit-icon')
		;

	})
	;
}







queue()
.defer(d3.json, 'http://localhost:5000/api/survey')
.await(loadSurveys)
;