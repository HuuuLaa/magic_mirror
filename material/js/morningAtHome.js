var morningAtHome = (function(){

	var video = document.getElementById("scene1");
	var pity = document.getElementById("pity");
	//0-无/1-在播放1/2-1end，等选择/3-在播放7/4-what a pity 
	var flag = 0;

	function animate(){
		if(flag==0) return;
		if(video.ended || video.paused){
			if(flag == 1){
				flag = 2;
				show_choice();
			}
			else if(flag == 3){
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
		$("#t3").show();

		//按钮
		$(".choice-btn").hide();
		$("#c3").show();
		$("#c4").show();

		//弹窗box
		$("#choiceBox").css('width','60%');
		var cb_height = (parseInt($("#vcanvas").css('height'))-parseInt($("#choiceBox").css('height'))-20)/2;
		var cb_width = (parseInt($("#vcanvas").css('width'))-parseInt($("#choiceBox").css('width'))-20)/2;		

		$("#choiceBox").css({'left':cb_width+"px",'top':cb_height+"px"});	
		$("#choiceBox").show();

		//是 事件
		$("#c3").click(function(){
			video.load();
			video = document.getElementById("scene7");
			$("#choiceBox").hide();
			video.play();
			flag = 3;
			requestAnimationFrame(animate);
		});
		//否 事件
		$("#c4").click(function(){
			flag = 4;
			$("#choiceBox").hide();
			pity.play();
			vctx.save();
			vctx.font = "80px Wawati SC";
			vctx.textBaseline = "middle";
			vctx.textAlign = 'center';
			vctx.fillText("What a pity！",vcanvas.width/2,vcanvas.height/2);
			vctx.restore();
			setTimeout(quit, 2000);
		});

	}
	function play_video(){
		document.getElementById("bgm0").pause();
		document.getElementById("bgm1").pause();
		last_pageY = window.pageYOffset;
		video = document.getElementById("scene1");
		$("body").css('background-position','0px ' + (-window.pageYOffset) + 'px');
		$("#bg").hide();
		$(".bling").hide();

		vctx.drawImage(video,0,(vcanvas.height-344)/2);
		$("#vcanvas").css({'width':'0','top':'50%','left':'50%','opacity':'0','display':'block'});
		
		$("#vcanvas").animate({'width':'100%','top':'0','left':'0','opacity':'1.0'},1500);

		$("#back").css({'top':'230px'});
		$("#back").slideDown();

		video.play();

		$("#back").unbind();
		$("#back").click(function(){
			quit();
		});
		flag = 1;
		requestAnimationFrame(animate);
	}

	function quit(){
		pity.load();
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