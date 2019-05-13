/*
1：7 8
2：9 10 11
5：12 13
6：14 15

*/

//1.公共变量
var ID0,ID1,ID2;
var spritesheet = new Image();

var BEGINNING = true;
// var scene = [];
var last_pageY = 0;

// for(i=0;i<6;i++){
// 	scene[i] = document.getElementById("scene"+i);
// }

var scene_f = [morningAtHome.play,
			   busStop.play,
			   atCompany.begin,
		       atGym.begin,
			   atHospital.begin,
			   eveAtHome.play];

var vcanvas = document.getElementById("vcanvas"),
	vctx = vcanvas.getContext("2d");

//2.函数
function putBling(){
	var bpos = [{x:0.876,y:0.0445},
				{x:0.4875,y:0.1685},
				{x:0.758,y:0.315},
				{x:0.786,y:0.518},
				{x:0.455,y:0.580},
				{x:0.3841,y:0.756}];

	for(var i=0;i<bpos.length;i++){
		var outerWidth = parseInt($("#main").css('width')),
			outerHeight = parseInt($("#main").css('height'));
		var blingWidth = parseInt($("#bling1").css("width")),
			blingHeight = parseInt($("#bling1").css('height'));

		$("#bling"+i).css('left',outerWidth*bpos[i].x-blingWidth/2);
		$("#bling"+i).css('top',outerHeight*bpos[i].y-blingHeight/2);
		$("#bling"+i).show();
	}
		// $("#vcanvas").css({'width':'100%','height':document.documentElement.clientHeight});
}

function begin_main(){
		document.getElementById("bgm0").play();
		document.getElementById("bgm1").play();
		$(".sitem").hide();
		$("#bg").fadeIn(putBling);

		for(var i=0;i<6;i++){
			$("#bling"+i).click(scene_f[i]);
		}
}
function requestFullScreen() {
      var de = document.documentElement;
      if (de.requestFullscreen) {
          de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
          de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
          de.webkitRequestFullScreen();
     }

      if(document.fullscreenElement||document.msFullscreenElement ||
      	document.mozFullScreenElement ||document.webkitFullscreenElement || 
      	false) {
      		document.removeEventListener("touchstart",requestFullScreen);
      }
 }
//4.
$(document).ready(function(){	  

	// $("#fs-text").show();
	// $("#mask").fadeIn(1000,function(){
	// 	$("#fs-text").fadeOut(2500);
	// 	$("#mask").fadeOut(2500);
	// });

	// document.addEventListener("touchstart",requestFullScreen);

	vcanvas.font= '20px Wawati SC';
	BEGINNING = true;

//	 begin_main();
	 bm.begin();	
	
	$("#skip").click(function(){
		BEGINNING = false;
		$("#skip-outer").hide();
		$("#skip").hide();
		$("#mcanvas").hide();
		$("#vcanvas").hide();
		$(".sitem").hide();
		$(".mitem").hide();
		begin_main();
		
		clearTimeout(ID0);
		clearTimeout(ID1);
		clearTimeout(ID2);
		document.getElementById("sq").load();
	});	
	// busStop.play();
	// morningAtHome.play();
	//eveAtHome.play();
	// atHospital.begin();
	// atCompany.begin();
//	 atGym.begin();

		
});