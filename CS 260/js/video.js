/* global $, console, brightcove, bcObjectId, bcPlayerId, bcPlayerKey,  */

'use strict';

// Loading JS/CSS Files
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

loadjscssfile('/content/js/main.js','js');

var removedVideo;

/*  Document Ready Function  */
$(window).load( function () {
  $('.SI_Video_Screen').show();
  $('.SI_Video_Screen').css("opacity","0");
setTimeout(function() {  
  //Resizing BrightSpace IFRAME
  $(window.top).bind('resize', function () {
    var win = window.top.document;
    var ifr = $(win).find('.d2l-iframe');
    var bodH = $('body').height();
    $(ifr).height(bodH);
  });


  $('.SI_Video_Screen').append('<div class=\"SI_Close\"></div>');

  /*  Onclick Video Open  */
  $('.SI_Play_Btn , .SI_Video_Still').click(function () {
    $('.SI_Vignette').show();
    if(removedVideo !== undefined){
      $('body').append(removedVideo);
    }
    $('.SI_Video_Screen').css("opacity","1");
    $('.SI_Video_Screen').show();
    var VidTop, VidLeft, VidWidth, WinWidth, WinTop,IconDim;
    IconDim = parseInt($('.SI_Close').innerHeight()) / 2;
    VidTop = $('.SI_Video_Screen').offset().top;
    VidLeft = $('.SI_Video_Screen').offset().left;
    VidWidth = $('.SI_Video_Screen').innerWidth();
    WinWidth = $(window).innerWidth();
    var OffsetX = ((parseInt(WinWidth) - (parseInt(VidLeft) + parseInt(VidWidth))) / 2 ) + parseInt(VidLeft) + parseInt(VidWidth) - IconDim;
    var OffsetY = (parseInt(VidTop) / 2) - IconDim;
    $('.SI_Close').offset({
      top: OffsetY,
      left: OffsetX
    });
  });

  /*  Onclick Video Close  */
  $('.SI_Close').click(function () {
    $('.SI_Vignette').hide();
    removedVideo = $('.SI_Video_Screen').detach();
  });
  //Placing the Image
  var image = $( 'div.SI_TEMPLATE_FULL' ).find( 'img' ).detach();
  $('div.SI_Video_Pane').prepend($(image));
  $(image).addClass('SI_Video_Still');
}, 400);

  /*  Initializing Video Screen  */
  var bcObject = '<p><object id="myExperience'+bcObjectId+'" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="805" /><param name="height" value="453" /><param name="playerID" value="'+bcPlayerId+'" /><param name="playerKey" value="'+bcPlayerKey+'" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="htmlFallback" value="true" /><param name="secureConnections" value="true" /><param name="secureHTMLConnections" value="true" /><param name="@videoPlayer" value="'+bcObjectId+'" /><param name="includeAPI" value="true" /><param name="templateLoadHandler" value="BCLS.onTemplateLoad" /><param name="templateReadyHandler" value="BCLS.onTemplateReady" /></object></p>';
  document.getElementsByClassName('SI_Video_Screen')[0].innerHTML = bcObject;
  brightcove.createExperiences();

  setTimeout(function() {
    $('.SI_Video_Screen').hide();
    var oh = $('img.SI_Video_Still').innerHeight();
    $('div.SI_Play_Btn').height((parseInt(oh)));
  }, 800);
});