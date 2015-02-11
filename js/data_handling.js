var surveys = d3.json('http://localhost:5000/api/survey', function(data){ return data; });



function loadSurveys(error, surveys) {
	console.log(surveys.objects);
}







queue()
.defer(d3.json, 'http://localhost:5000/api/survey')
.await(loadSurveys)
;