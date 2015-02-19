// TODO: Implement methods to lay out live survey page


queue()
.defer(d3.json,'http://localhost:5000/api/survey?q={%22filters%22:[{%22name%22:%20%22is_live%22,%20%22op%22:%20%22==%22,%20%22val%22:%201}]}')
.await(setupSurveyPage)


function setupSurveyPage(error,survey_data) {
	survey_data = survey_data.objects[0];
	//console.log(survey_data);

	var questions = [{'number':1,'text':survey_data.q1_text,'type':survey_data.q1_type}]
	if (survey_data.q2_text) { questions.push({'number':2,'text':survey_data.q2_text,'type':survey_data.q2_type});}
	if (survey_data.q3_text) { questions.push({'number':3,'text':survey_data.q3_text,'type':survey_data.q3_type});}
	if (survey_data.q4_text) { questions.push({'number':4,'text':survey_data.q4_text,'type':survey_data.q4_type});}
	if (survey_data.q5_text) { questions.push({'number':5,'text':survey_data.q5_text,'type':survey_data.q5_type});}

	//console.log(questions);

	var pages_container = d3.select('.pages-container')

	console.log(questions.length);
	questions.forEach(function(element, index, array){
		console.log(element);
		console.log('q'+String(index+1));
		console.log('\n');
		var footer_message = 'Kneaders Customer Satisfaction Survey - You have '+String(questions.length-index)+' questions left';
		if (questions.length-index == 0) {footer_message = 'Kneaders Customer Satisfaction Survey - This is your last question';}

		var new_page = pages_container.append('div').attr('data-role','page').attr('id','q'+String(index+1));

		var new_page_header = new_page.append('div').attr('data-role','header');
		for (var i = 1; i <= questions.length; i++) {
			if (index >= i-1) {new_page_header.append('div').attr('class','col active').attr('style','width: '+String((100/(questions.length+1)).toPrecision(4))+'%').html(String(i))}
			else {new_page_header.append('div').attr('class','col').attr('style','width: '+String((100/(questions.length+1)).toPrecision(4))+'%').html(String(i))}
		}
		new_page_header.append('div').attr('class','col').attr('style','width: '+String((100/(questions.length+1)).toPrecision(4))+'%')
					   .append('i').attr('class','fa fa-gift gold');

		var new_page_wrapper = new_page.append('div').attr('class','wrapper');
		var new_page_content = new_page_wrapper.append('div').attr('role','main').attr('class','ui-content');

		var new_page_question_container = new_page_content.append('div').attr('class','question-container');
		new_page_question_container.append('p').attr('class','question').html(element.text);
		if (element.type == 'Scale 1-5') {
			var question_scale_container = new_page_question_container.append('div').attr('class','scale-container')
																	  .append('fieldset').attr('data-role','controlgroup').attr('data-type','horizontal');
			var letters = ['a','b','c','d','e'];
			for (var j = 1; j <= 5; j++) {
				question_scale_container.append('input').attr('type','radio').attr('name','q'+String(index)+'_answer').attr('id','radio-choice-h-2'+letters[j-1]).attr('value',String(j));
				question_scale_container.append('label').attr('class','scale').attr('for','radio-choice-h-2'+letters[j-1]).html(String(j));
			}
		}
		else {
			var radio_yes_option = new_page_question_container.append('label').attr('class','radio');
			radio_yes_option.append('p').html('Yes');
			radio_yes_option.append('input').attr('type','radio').attr('name','q'+String(index)+'_answer').attr('id','q'+String(index)+'_answer').attr('class','custom-radio').attr('value','1');

			var radio_no_option = new_page_question_container.append('label').attr('class','radio');
			radio_no_option.append('p').html('No');
			radio_no_option.append('input').attr('type','radio').attr('name','q'+String(index)+'_answer').attr('id','q'+String(index)+'_answer').attr('class','custom-radio').attr('value','0');
		}
		
		var left_arrow_href = '#enter';
		if (index > 0) {left_arrow_href = '#q'+String(index);}
		var right_arrow_href = '#q'+String(index+2);
		console.log('index: ',index);
		console.log('questions.length-1: ',questions.length-1);
		if (index == questions.length-1) {right_arrow_href = '#reward';}
		console.log('right-arrow-href: ',right_arrow_href);
		new_page_content.append('p')
						.append('a').attr('class','btn btn-primary pull-left btn-next').attr('href',left_arrow_href).attr('data-transition','slide').attr('role','button')
						.append('i').attr('class','fa fa-arrow-left');
		new_page_content.append('p')
						.append('a').attr('class','btn btn-primary pull-right btn-next').attr('href',right_arrow_href).attr('data-transition','slide').attr('role','button')
						.append('i').attr('class','fa fa-arrow-right');

		var new_page_footer = new_page_wrapper.append('div').attr('data-role','footer').append('h4').html(footer_message);
	})

	var rewards_page = pages_container.append('div').attr('data-role','page').attr('id','reward');

	var rewards_page_header = rewards_page.append('div').attr('data-role','header');
	for (var i = 1; i <= questions.length; i++) {
		rewards_page_header.append('div').attr('class','col active').attr('style','width: '+String((100/(questions.length+1)).toPrecision(4))+'%').html(String(i));
	}
	rewards_page_header.append('div').attr('class','col active').attr('style','width: '+String((100/(questions.length+1)).toPrecision(4))+'%')
					   .append('i').attr('class','fa fa-gift gold');

	var rewards_page_content = rewards_page.append('div').attr('role','main').attr('class','ui-content');
	var rewards_page_question_container = rewards_page_content.append('div').attr('class','question-container');
	rewards_page_question_container.append('p').html('Thanks for taking the survey! To receive your coupon, enter your email address below: ');
	rewards_page_question_container.append('label').attr('for','email').html('Email Address: ');
	rewards_page_question_container.append('input').attr('type','text').attr('name','email').attr('id','email');

	rewards_page_content.append('p').append('a').attr('class','btn btn-primary pull-right btn-finish').attr('href','#enter').attr('role','button').html('Submit');

	rewards_page.append('div').attr('data-role','footer').append('h4').html('Thanks for your time - enjoy your reward!');
}