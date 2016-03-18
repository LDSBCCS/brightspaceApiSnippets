var images,fullscreen = false;

function toploadjscssfile(filename, filetype){
    if (filetype==="js"){ //if filename is a external JavaScript file
        var fileref=window.top.document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype==="css"){ //if filename is an external CSS file
        var fileref=window.top.document.createElement("link")
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!=="undefined")
        window.top.document.getElementsByTagName("head")[0].appendChild(fileref);
}
 
toploadjscssfile("/content/common/departments/si/oldTestTemplates/css/custom_styles/image_expand.css", "css");

window.onload = function() {
	if (document.querySelectorAll)
	    images = document.querySelectorAll("img");
	else
		images = document.getElementsByTagName("img");

	if(images!==undefined){
		for (i = 0; i < images.length; i++) { 
			addFullscreenAbility(images[i]);
		}
	}

	function addFullscreenAbility(element) {
		element.addEventListener("click",function(){
			toggleFullscreen(element);
		});
	}

	function toggleFullscreen(object){
		if(fullscreen === false){
			var imageSource = object.src;
			var imageWidth = object.width;
			var imageHeight = object.height;
			var windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			var windowRatio = windowWidth/windowHeight;
			var imageRatio = imageWidth / imageHeight;
			var imageClassName = "imagePortrait";
			if(((imageWidth > imageHeight) && (windowRatio < imageRatio))||((imageWidth < imageHeight) && (windowRatio < imageRatio))){
				imageClassName = "imageLandscape";
			}
			$(window.top.document).find('body').append( "<div class=\"fullscreenActive\"><img class=\""+imageClassName+"\"src=\""+imageSource+"\"/><div class=\"closeButton\"></div></div>" );

			$(window.top.document).find(".fullscreenActive").click(function(){
				$(window.top.document).find('.fullscreenActive').remove();
				fullscreen = false;
			});
			$(window.top.document).find("img").click(function(e){
				//e.preventDefault();
				//e.stopPropagation();
			});
			fullscreen = true;
			setTimeout(function(){ 
				var fullImagePosition = $(window.top.document).find('.fullscreenActive img').position();
				var fullImageWidth = $(window.top.document).find('.fullscreenActive img').width();
				$(window.top.document).find('.closeButton').css('left',fullImagePosition.left + fullImageWidth - 34);
				$(window.top.document).find('.closeButton').css('top',fullImagePosition.top + 5);
				$(window.top.document).find('.closeButton').css('cursor', 'pointer');
				$(window.top.document).find('.closeButton').fadeToggle();
			}, 1200);
		} else {
			fullscreen = false;
			$(window.top.document).find('.fullscreenActive').remove();
		}
	}

	setTimeout(function(){ 
		var leftPosition = $(".SI_Image").offset().left+$(".SI_Image").width();
		var topPosition = $(".SI_Image").offset().top+$(".SI_Image").height();
		if($('body').find('.SI_IMG_LEFT')[0] === undefined){
			$('body').append("<div id=\"expandIcon\"style=\"width:40px;height:40px;background:url('/content/common/departments/si/oldTestTemplates/img/Expand.svg');background-size:23px 23px;background-position:center center;background-repeat:no-repeat;position:absolute;left:"+leftPosition+"px;top:"+topPosition+"px;margin-left:-40px;margin-top:-4px;cursor:pointer\" onclick=\"$('.SI_Image img').click();\"></div>");
		}
	},1200);

};