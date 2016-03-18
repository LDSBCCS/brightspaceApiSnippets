/*global localStorage, window, createSubmission, lessonNumber, slideNumber, slideTitle, questionText, answer */

'use strict';

/*   LIBRARY   */

//Loads External JS and CSS files
function loadjscssfile(filename, filetype) {
  var fileref;
  if (filetype === "js") { //if filename is a external JavaScript file
    fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
  } else if (filetype === "css") { //if filename is an external CSS file
    fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
  }
  if (typeof fileref !== "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}


/*   CUSTOM STUDY JOURNAL/EPORTFOLIO FUNCTIONS   */
function ePortfolioSubmit(lessonNumber, slideNumber, slideTitle, messageBody) {
  var packageEP = {
    "ObjectId": 0,
    "Name": (lessonNumber + '-' + slideNumber + ': ' + slideTitle),
    "Description": messageBody,
    "Tags": [
      {
        "Text": "LDSBC - Test",
        "Type": 0
      }
    ],
    "GeoTag": null,
    "AllowComments": true
  };
  $.ajax({
    method: 'POST',
    url: '/d2l/api/eP/2.5/reflections/new', 
    headers: {
      'X-Csrf-Token': localStorage['XSRF.Token'],
      'X-D2L-App-Id': 'this field is deprecated'
    },
    data: JSON.stringify(packageEP)/*,
    success: function (data) {
      console.log('success');
    },
    error: function (data) {
      console.log('failure');  
    }*/
  });
}


/*   CUSTOM DROPBOX FUNCTIONS   */
function customGetDropboxFolder(topic, courseOu, data) {
  var theFolder;
  var length = data.length;
  var i = 0;
  for (i; i < length; i++) {
    if (topic.Title === data[i].Name) {
      theFolder = data[i];
      break;
    }
  }
  return theFolder;
}

function customAlignText(lessonNumber, slideNumber, slideTitle, questionText, answer) {
  var today = new Date();

  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  today = mm + '/' + dd + '/' + yyyy;

  var messageBody = "";
  messageBody += "<h3>" + lessonNumber + "-" + slideNumber + " : " + slideTitle + "&nbsp;&nbsp;&nbsp;</h3>";
  messageBody += "<br />";
  messageBody += "<strong>" + questionText + "</strong>";
  messageBody += "<br /><br />";
  messageBody += answer;
  messageBody += "<br /><br /><br />";
  messageBody += "<small>Submitted : " + today + "</small>";

  ePortfolioSubmit(lessonNumber, slideNumber, slideTitle, messageBody);

  return messageBody;
}

function customFailFx(msg) {
  $('.SI_Pending').fadeOut('fast');  
}

function customSuccessFx() {
  var $BodHeight = $('body').height();
  $('.SI_Submitted').height($BodHeight);
  $('.SI_Pending').fadeOut('fast');
  $('.SI_Submitted').fadeIn('slow');
}


/*   DOCUMENT READY FUNCTION   */

$(document).ready(function () {
  loadjscssfile('/content/js/main.js', 'js');
  var image = $('.SI_TEMPLATE_PART').find('img:not(.SI_Loader)').detach();
  $('.SI_Image').prepend(image);

  $(window.top).bind('resize', function () {
    var win = window.top.document;
    var ifr = $(win).find('.d2l-iframe');
    var bodH = $('body').height();
    $(ifr).height(bodH);
  });

  $('.SI_Submit_Btn').click(function () {
    var $BodHeight = $('body').height();
    $('.SI_Pending').height($BodHeight);
    $('.SI_Pending').fadeIn('slow');
    var answer = $('textarea').val();
    createSubmission(lessonNumber, slideNumber, slideTitle, questionText, answer);
  });
});