/* global window*/
'use strict';
//Creates Pop-up Window for Scripture
function loadScripture(href) {
  var popHeight = 450;
  var popWidth = 350;
  var leftAdj = 2 * (window.top.outerWidth / 3) - (popWidth / 2);
  var topAdj = (window.top.outerHeight / 2) - (popHeight / 2);
  var myWin = window.open(href, '_blank', 'location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toobar=no');
  myWin.moveBy(leftAdj, topAdj);
  myWin.resizeTo(popWidth, popHeight);
  myWin.focus();
}

//Creates Pop-up Window for Scripture
function loadMusic(href) {
  var popHeight = 800;
  var popWidth = 1020;
  var leftAdj = (window.top.outerWidth / 2) - (popWidth / 2);
  var topAdj = (window.top.outerHeight / 2) - (popHeight / 2);
  var myWin = window.open(href, '_blank', 'location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,titlebar=no,toobar=no');
  myWin.moveBy(leftAdj, topAdj);
  myWin.resizeTo(popWidth, popHeight);
  myWin.focus();
}
//Loads External JS or CSS Files
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

//Finds Links to Scriptures/Music and Overwrites Click Event
function preload() {
  //Re-route Specified Links
  $('a').each(function () {
    var href = $(this).attr('href');
    if (href.substring(0, 31) === 'https://www.lds.org/scriptures/' || href.substring(0, 30) === 'http://www.lds.org/scriptures/') {
      $(this).click(function (event) {
        event.preventDefault();
        loadScripture(href);
      });
    }
    if (href.substring(0, 26) === 'https://www.lds.org/music/' || href.substring(0, 25) === 'http://www.lds.org/music/') {
      $(this).click(function (event) {
        event.preventDefault();
        loadMusic(href);
      });
    }
    if (href.substring(0, 32) === 'https://www.lds.org/study-tools/' || href.substring(0, 31) === 'http://www.lds.org/study-tools/') {
      $(this).click(function (event) {
        event.preventDefault();
        loadMusic(href);
      });
    }
  });
}

//Runs when Document is Fully Loaded
$(document).ready(function () {
  loadjscssfile('/content/js/Vendor/FileSaver.min.js','js');
  // $('body').append('<button class="print"></button>');
  preload();
/*  $('button.print').click(function () {
    var inputText = document.body.textContent;
    var inputTitle = 'SI_Output.txt'
    var blob = new Blob([inputText], {type: "text/plain;charset=utf-8"});
    saveAs(blob, inputTitle);
  });*/
  $(window.top).keydown(function(event) {
    if (event.keyCode === 18) {
      var inputText = document.body.textContent;
      var inputTitle = 'SI_Output.txt'
      var blob = new Blob([inputText], {type: "text/plain;charset=utf-8"});
      saveAs(blob, inputTitle);
    }
  })
});