/*global window*/

'use strict';

$(window).load(function () {
  loadjscssfile('/content/js/main.js','js');
//Resizing BrightSpace IFRAME
  $(window.top).bind('resize', function () {
    var win = window.top.document;
    var ifr = $(win).find('.d2l-iframe');
    var bodH = $('body').height();
    $(ifr).height(bodH);
  });
//Checking for and placing DIV
  if ($('.SI_Image').length === 0) {
    $('.SI_Text').before('<div class="SI_Image"></div>');
  }
//Placing IMG
  var image = $('.SI_TEMPLATE_FULL').find('img').detach();
  $('.SI_Image').append(image);
  image.addClass('SI_Abs_Middle');
//Adjusting Height of SI_Image
  setTimeout(function () {
    var texH = $('.SI_Text').outerHeight();
    $('.SI_Image').outerHeight(texH);
  }, 800);
});

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}