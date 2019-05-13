var atHospital  = (function(){

	var hospital = new Image();
	hospital.src = "material/images/hospital.png";

	var pc;
	hospital.onload = function(){
		pc = hospital.width/vcanvas.width;
	}
	function begin(){
		last_pageY = window.pageYOffset;

		$("body").css('background-position','0px ' + (-window.pageYOffset) + 'px');
		$("#bg").hide();
		$(".bling").hide();


		$("#vcanvas").css({'width':'0','top':'50%','left':'50%','opacity':'0','display':'block'});
		$("#vcanvas").animate({'width':'100%','top':'0','left':'0','opacity':'1.0'},1500);

		vctx.drawImage(hospital,0,(vcanvas.height-hospital.height/pc)/2,hospital.width/pc,hospital.height/pc);

		$("#back").css('top',110+"px");
		$("#back").slideDown();

		$("#back").unbind();
		$("#back").click(function(){
			quit();
		});
		// flag = 1;
		// $("#vcanvas").css({'display':'block',
		// 	'width':'0',
		// 	'height':'0',
		// 	'top':'50%',
		// 	'left':'50%',
		// 	'opacity':'0'	
		// });
		
		// $("#vcanvas").animate({'width':'100%',
		// 	'height':'100%',
		// 	'top':'0',
		// 	'left':'0',
		// 	'opacity':'1.0'},1000);		
	}
	function quit(){
			vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
			$(".sitem").fadeOut();
			$("#bg").show();
			putBling();
			window.scrollBy(0,last_pageY);			
	}

	return {begin:begin};	

})();