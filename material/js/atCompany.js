var atCompany = (function(){

	//0-2-4 光圈选择图片
	//1 - 3播放
	//3 - 4播放
	//5 - 5播放

	//6 - 5的选项弹窗

	//7 12/13在播放
	//8 - 7放完了继续选择 同6
	//9 13/12在播放


	var flag = -1;

	var video = document.getElementById("scene3");
	var company = new Image();
	company.src = "material/images/company.png";

	company.onload = function(){
		pc = company.width/vcanvas.width;
	}
	var pc;
	var cbpos = [{x:0.525,y:0.32},
				{x:0.308,y:0.3},
				{x:0.09,y:0.325}];

	function animate(){
//		console.log(flag);
		vctx.clearRect(0,0,vcanvas.width,vcanvas.height);

		if(flag == -1) return;

		// 3个光圈 静态图显示
		if(flag % 2 == 0 && flag < 6){
			vctx.drawImage(company,
				0,company.height/3*(flag/2),company.width,company.height/3,
				0,(vcanvas.height-company.height/3/pc)/2,company.width/pc,company.height/3/pc);
		}
		//弹窗界面
		else if(flag == 6 || flag == 8){
			vctx.drawImage(video,0,(vcanvas.height-344)/2);
		}
		//视频中
		else {
			//1 3 5 7 9在播放视频
			if(video.ended || video.paused){

				if(flag == 5){
					flag++;
					show_choice();
				}
				else if(flag == 7){
					//一个分支播放完了
					flag++;
					show_choice();
				}
				else if(flag == 9){
					flag++;
					quit();
				}
				else{
					flag++;
					put_c_bling();

					if(flag == 2){
						$("#c_bling").click(function(){
							$("#c_bling").hide();
							flag = 3;
							video.load();
							video = document.getElementById("scene4");
							video.play();
							$("#c_bling").unbind();
						});						
					}
					else if(flag == 4){
						$("#c_bling").click(function(){
							$("#c_bling").hide();
							flag = 5;
							video.load();
							video = document.getElementById("scene5");
							video.play();
							$("#c_bling").unbind();
						});							
					}
				}
			}
			else {
				vctx.drawImage(video,0,(vcanvas.height-344)/2);
			}

		}

		requestAnimationFrame(animate);


	}
	function put_c_bling(){
		if(flag >=6 || flag % 2 != 0) return;

		var blingWidth = parseInt($("#c_bling").css("width")),
			blingHeight = parseInt($("#c_bling").css('height'));

		$("#c_bling").css('left',vcanvas.width*cbpos[flag/2].x-blingWidth/2);
		$("#c_bling").css('top',vcanvas.height*cbpos[flag/2].y-blingHeight/2);
		$("#c_bling").show();
	}
	function show_choice(){
		//提示文字
		$("#text-box p").hide();

		//按钮
		$(".choice-btn").hide();
		$("#c11").show();
		$("#c12").show();

		//弹窗box
		$("#choiceBox").css('width','40%');	
		$("#choice-btn-box").css('flex-direction','column');	

		var cb_height = (parseInt($("#vcanvas").css('height'))-parseInt($("#choiceBox").css('height'))-20)/2;
		var cb_width = (parseInt($("#vcanvas").css('width'))-parseInt($("#choiceBox").css('width'))-20)/2;

		$("#choiceBox").css({'left':cb_width+"px",'top':cb_height+"px"});	
		$("#choiceBox").show();	

		//事件
		$("#c11").click(function(){
			flag = 7;
			$("#choiceBox").hide();
			video.load();
			video = document.getElementById("scene12");
			video.play();
			requestAnimationFrame(animate);
		});
		$("#c12").click(function(){
			flag = 7;
			$("#choiceBox").hide();
			video.load();
			video = document.getElementById("scene13");
			video.play();
			requestAnimationFrame(animate);
		});		
	}

	function begin(){
		document.getElementById("bgm0").pause();
		document.getElementById("bgm1").pause();
		last_pageY = window.pageYOffset;
		video = document.getElementById("scene3");

		$("body").css('background-position','0px ' + (-window.pageYOffset) + 'px');
		$("#bg").hide();
		$(".bling").hide();

		$("#vcanvas").css({'width':'0','top':'50%','left':'50%','display':'block','opacity':'0'});
		$("#vcanvas").animate({'width':'100%','top':'0','left':'0','opacity':'1.0'},1500,function(){

			$("#back").css({'top':'230px'});
			$("#back").slideDown();

			$("#choiceBox").css('top','50%');

			
			flag = 0;
			put_c_bling();

			requestAnimationFrame(animate);

			$("#c_bling").click(function(){
				flag = 1;
				$("#c_bling").hide();
				video.play();
				$("#c_bling").unbind();
			});

		});
			
			$("#back").unbind();
			$("#back").click(function(){
				quit();
			});		
		


	}
	function quit(){	
		console.log(flag);
		$("#choiceBox").hide();

		if(flag % 2 == 0){
			//退出场景
			video.load();
			flag = -1;		
			$("#choiceBox").hide();
			vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
			$(".sitem").fadeOut();
			$("#bg").show();
			putBling();
			window.scrollBy(0,last_pageY);	
			document.getElementById("bgm0").play();
			document.getElementById("bgm1").play();		
		}
		else{
			//退出视频
			video.load();
			flag++;
			put_c_bling();
			if(flag == 2){
				$("#c_bling").click(function(){
					$("#c_bling").hide();
					flag = 3;
					video.load();
					video = document.getElementById("scene4");
					video.play();
					$("#c_bling").unbind();

				});						
			}
			else if(flag == 4){
				$("#c_bling").click(function(){

					$("#c_bling").hide();
					flag = 5;
					video.load();
					video = document.getElementById("scene5");
					video.play();
					$("#c_bling").unbind();

				});							
			}
			else if(flag == 6){
				flag = 4;
				$("#c_bling").click(function(){

					$("#c_bling").hide();
					flag = 5;
					video.load();
					video = document.getElementById("scene5");
					video.play();
					$("#c_bling").unbind();

				});											
				put_c_bling();

			}
			else if(flag == 8){
				show_choice();
			}
		}
		

	}
	return {begin:begin};	

})();