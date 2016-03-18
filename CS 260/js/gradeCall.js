var _response = document.getElementByID("response");

function getCurrentGrade(courseOu){
	$.ajax('/d2l/api/le/1.5/enrollments/myenrollments', {
        method: 'GET',
        dataType: 'json',
        headers: {
        'X-Csrf-Token': localStorage['XSRF.Token'],
        'X-D2L-App-Id': 'this field is deprecated'
    	},
    	
    		
    	}
    ).done(function (data){
    	var grade = document.getElementById('response');
    	grade.textContent = data;
    });
}