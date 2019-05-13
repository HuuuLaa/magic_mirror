var busStop = (function(){
	var video = document.getElementById("scene2");
	//0-无/1-2在播放/2-2播放完，等选择/3-8910在播放/4-8910播放完了等回答/5-11在播放
	var flag = 0;

	function animate(){
		if(flag==0) {return;}
		if(video.ended || video.paused){
			if(flag == 1 || flag == 3){
				flag++;
				show_choice();
			}
			else if(flag == 5){
				quit();
			}
		}
		else{
			vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
			vctx.drawImage(video,0,(vcanvas.height-344)/2);
			requestAnimationFrame(animate);			
		}
	}

	function show_choice(){
		//提示文字
		$("#text-box p").hide();
		$("#t4").show();

		//按钮
		if(flag==2){
			$(".choice-btn").hide();
			$("#c5").show();
			$("#c6").show();
			$("#c7").show();
			$("#c8").show();
		}
		//弹窗box
		$("#choice-btn-box").css({'flex-direction':'row','flex-wrap':'wrap'});
		$("#choiceBox").css('width','85%');

		var cb_height = (parseInt($("#vcanvas").css('height'))-parseInt($("#choiceBox").css('height'))-20)/2;
		var cb_width = (parseInt($("#vcanvas").css('width'))-parseInt($("#choiceBox").css('width'))-20)/2;

		$("#choiceBox").css({'left':cb_width+"px",'top':cb_height+"px"});	
		$("#choiceBox").show();		

		//事件
		$("#c5").click(function(){
			flag = 3;
			$("#c5").hide();
			$("#choiceBox").hide();
			video.load();
			video = document.getElementById("scene8");
			video.play();
			requestAnimationFrame(animate);
		});
		$("#c6").click(function(){
			flag = 3;
			$("#c6").hide();
			$("#choiceBox").hide();
			video.load();
			video = document.getElementById("scene9");
			video.play();
			requestAnimationFrame(animate);
		});
		$("#c7").click(function(){
			flag = 3;
			$("#c7").hide();
			$("#choiceBox").hide();
			video.load();
			video = document.getElementById("scene10");
			video.play();
			requestAnimationFrame(animate);
		});
		$("#c8").click(function(){
			flag = 5;
			$("#choiceBox").hide();
			video.load();
			video = document.getElementById("scene11");
			video.play();
			requestAnimationFrame(animate);
		});
	}
	function play_video(){
	document.getElementById("bgm0").pause();
	document.getElementById("bgm1").pause();
		last_pageY = window.pageYOffset;
				console.log(last_pageY);

		video = document.getElementById("scene2");


		$("body").css('background-position','0px ' + (-window.pageYOffset) + 'px');
		$("#bg").hide();
		$(".bling").hide();

		vctx.drawImage(video,0,(vcanvas.height-344)/2);

		$("#vcanvas").css({'width':'0','top':'50%','left':'50%','display':'block','opacity':'0'});
		$("#vcanvas").animate({'width':'100%','top':'0','left':'0','opacity':'1.0'},1500);

		$("#back").css({'top':'230px'});
		$("#back").slideDown();

		$("#choiceBox").css('top','50%');
		video.play();
		
		$("#back").unbind();
		$("#back").click(function(){
			quit();
		});

		flag = 1;
		requestAnimationFrame(animate);
	}

	function quit(){
		
		video.load();
		flag = 0;		
		vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
		$("#choiceBox").hide();
		$(".sitem").fadeOut();
		$("#bg").show();
		putBling();
		window.scrollBy(0,last_pageY);
		document.getElementById("bgm0").play();
		document.getElementById("bgm1").play();
	}
	return {play:play_video};
})();