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
							  .attr("class", 'survey-name')
							  ;

		var new_survey_secondary = new_survey
								   .append("div")
								   .attr("class", 'survey-name')
								   ;
	})
	;
}







queue()
.defer(d3.json, 'http://localhost:5000/api/survey')
.await(loadSurveys)
;