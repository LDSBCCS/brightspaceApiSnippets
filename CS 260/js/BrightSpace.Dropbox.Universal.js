/**
  *
  * Code Created by Justin Hanks and Dan Langford 2015
  * Updated for universal use on 7/21/2015
  * First Use: Online Seminary: Old Testament
  *
  *
  **/

loadjquery();

function loadjquery(){
    var fileref=document.createElement('script');
    fileref.setAttribute("type","text/javascript");
    fileref.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js");
    document.body.appendChild(fileref);
    //document.getElementsByTagName("head")[0].appendChild(fileref);
}

function getCourseID() {
    var course = window.parent.parent.location.pathname.split('/')[4];
    return course;
}

function getLastTopic(courseOu) {
    var def = $.Deferred();

    $.ajax('/d2l/api/le/1.5/' + courseOu + '/content/recent', {
        method: 'GET',
        headers: {
        'X-Csrf-Token': localStorage['XSRF.Token'],
        'X-D2L-App-Id': 'this field is deprecated'
        },
        success:function(data){
            def.resolve(data[0],courseOu);
        }
    } );
    return def.promise();    
}

function getDropboxFolder(topic,courseOu) {
    var def = $.Deferred();

    $.ajax('/d2l/api/le/1.5/' + courseOu + '/dropbox/folders/', {
        method: 'GET',
        headers: {
        'X-Csrf-Token': localStorage['XSRF.Token'],
        'X-D2L-App-Id': 'this field is deprecated'
    },
        success:function(data){
            var theFolder;
            if (typeof customGetDropboxFolder == 'function') {
                theFolder = customGetDropboxFolder(topic,courseOu,data);
            } else {
                var length = data.length;
                for (var i=0;i<length;i++) {
                    if(topic.Title === data[i].Name) {
                        theFolder = data[i];
                        break;
                    }
                }
            }
            if(theFolder){
                def.resolve(theFolder);
            } else {
                def.reject('No Dropbox Folder found with name \'' + topic.Title + '\'');
            }
        }
    } );

    return def.promise();

}

function alignText(lessonNumber,slideNumber,slideTitle,questionText,answer) {
    var messageBody;
    if (typeof customAlignText == 'function') {
            messageBody = customAlignText(lessonNumber,slideNumber,slideTitle,questionText,answer);
    } else {
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
          dd='0'+dd
        } 
        if(mm<10){
          mm='0'+mm
        } 
        var today = mm+'/'+dd+'/'+yyyy;

        var messageBody = "";
        messageBody += "<h3>" + lessonNumber + "-" + slideNumber + " : " + slideTitle + "</h3>";
        messageBody += "<br />";
        messageBody += "<strong>" + questionText + "</strong>";
        messageBody += "<br /><br />";
        messageBody += answer;
        messageBody += "<br /><br /><br />";
        messageBody += "<small>Submitted : " + today + "</small>";
    }

    return messageBody;
}

function submitToDropbox(dropbox,description,courseOu) {
    var def = $.Deferred();

    var xhr = new XMLHttpRequest();
    var filename = dropbox.Name.replace(/\s/g,'_') + '.html';       //changed to .html

    xhr.open("POST", '/d2l/api/le/1.5/'+courseOu+'/dropbox/folders/'+dropbox.Id+'/submissions/mysubmissions/', true);

    var boundary = '---------------------------';
    boundary += Math.floor(Math.random()*32768);
    boundary += Math.floor(Math.random()*32768);
    boundary += Math.floor(Math.random()*32768);
    xhr.setRequestHeader("Content-Type", 'multipart/mixed; boundary=' + boundary);
    var body = '';
    body += '--' + boundary + '\r\n' ;
    body += "Content-Type: application/json\r\n\r\n";
    body += '   {"text":"This is a response to ' + dropbox.Name + '","html":null}   ';                   //Response to Module 1
    body += '\r\n';
    body += '--' + boundary+ '\r\n';
    body += 'Content-Disposition: form-data; name="file"; filename="'+ filename +'" \r\n'       //Justin Hanks Module 1 Response
    body += "Content-Type: text/html\r\n\r\n";      //changed plain to html
    body += description;                                     //JS string containing all of email contents
    body += '\r\n'
    body += '--' + boundary + '--';
    xhr.setRequestHeader('X-Csrf-Token', localStorage['XSRF.Token']);
    xhr.setRequestHeader('X-D2L-App-Id', 'this field is deprecated');
    xhr.onreadystatechange = function () {
    if (xhr.readyState != 4 || xhr.status != 200) return;
        def.resolve(xhr.responseText);
    };

    xhr.send(body);

    return def.promise();
}

function createSubmission(lessonNumber,slideNumber,slideTitle,questionText,answer) {
    var courseOu = getCourseID();
    var description = alignText(lessonNumber,slideNumber,slideTitle,questionText,answer);
    getLastTopic(courseOu);

    $.when(courseOu)
        .then(getLastTopic)
        .then(getDropboxFolder)
        .done(function(dropbox){
            submitToDropbox(dropbox, description,courseOu)
                .done(successFx).fail(failFx)
        })
        .fail(failFx)
}

function failFx(msg) {
    if (typeof customFailFx == 'function') {
        customFailFx();
    } else {
        alert('Your Response was not submitted. Please Try Again.');
    }
}

function successFx() {
    if (typeof customSuccessFx == 'function') {
        customSuccessFx();
    } else {
        alert('Thank you. Your Response was submitteed.');
    }
}

//createSubmission('Some Cool Course','Popcorn?/$Yellow','Favorite Food?/$Worst Color',1);