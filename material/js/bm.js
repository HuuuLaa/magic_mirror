var bm = (function begin_mirror() {

	
	var exArray = []; //存储设备源ID  
	var bg = new Image();bg.src = "material/images/mirror_bg.png";
	
	var sq = document.getElementById("sq");
	
	var video = document.getElementById('mvideo');
	 var vp = {x:89,y:104,width:219,height:353};//摄像头拍摄区域

	 var mcanvas = document.getElementById("mcanvas"),
	 mctx = mcanvas.getContext("2d");

	var pc ;

	console.log(bg.width);

	 var c_flag = -1;

	 function animate() {
		if(!BEGINNING) return;
	 	if(c_flag === -1) {
	 		video.src = "";
	 		return;
	 	}

	 	mctx.clearRect(0, 0, mcanvas.width, mcanvas.height);
	 	mctx.drawImage(bg,0,0,mcanvas.width, mcanvas.height);
	 	//水平翻转
	 	mctx.save();
	 	mctx.scale(-1,1);
	 	mctx.drawImage(video,-vp.x/pc,vp.y/pc,-vp.width/pc,vp.height/pc);
	 	mctx.restore();

	 	requestNextAnimationFrame(animate);
	 }

	 function show_choice() {
	 	//提示文本
	 	$("#text-box p").hide();
	 	$("#t1").show();
	 	//按钮
	 	$(".choice-btn").hide();
	 	$("#c1").show();
	 	$("#c2").show();

	 	$("#choiceBox").css('display','flex');
	 	$("#choiceBox").css('width','40%');
		var cb_width = (parseInt($("#vcanvas").css('width'))-parseInt($("#choiceBox").css('width'))-20)/2;		

		$("#choiceBox").css({'left':cb_width+"px",'top':'28%'});	
	 	$("#choice-btn-box").css('flex-direction','column');
	 	$("#choiceBox").fadeIn();

	 	$("#c1").click(function () {
			//进入main！！！
			BEGINNING = false;
			$("#choiceBox").hide();
			end();
			
			begin_main();
		});


	 	$("#c2").click(function () {
	 		$("#t1").hide();
	 		$("#t2").show();	
	 		$("#c2").hide();
	 		document.getElementById("c1").innerHTML ="还是看看吧";		
	 	});
	 }
	 function getUserMedia(constraints, success, error) {
	 	if (navigator.mediaDevices.getUserMedia) {
			//最新的标准API
			navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
		} else if (navigator.webkitGetUserMedia) {
			//webkit核心浏览器
			navigator.webkitGetUserMedia(constraints,success, error)
		} else if (navigator.mozGetUserMedia) {
			//firfox浏览器
			navigator.mozGetUserMedia(constraints, success, error);
		} else if (navigator.getUserMedia) {
			//旧版API
			navigator.getUserMedia(constraints, success, error);
		}
	}
	function success(stream) {
		//兼容webkit核心浏览器
		let CompatibleURL = window.URL || window.webkitURL;
		//将视频流设置为video元素的源
		console.log(stream);
		//video.src = CompatibleURL.createObjectURL(stream);
		video.srcObject = stream;
		video.play();
		play();
		
		
	}

	function error(error) {
		console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
		alert(`访问用户媒体设备失败${error.name}, ${error.message}`);
		play();

	}

	        function begin() {


       	 pc = bg.width/mcanvas.width;
  // // 设置video监听器  
  // if(navigator.getUserMedia) { // Standard  
  // 	navigator.getUserMedia(videoObj, function(stream) {  
  // 		video.src = stream;  
  // 		video.play();  
  // 	}, errBack);  
  // } 
  // else if(navigator.webkitGetUserMedia) { // WebKit-prefixed  
  // 	navigator.webkitGetUserMedia(videoObj, function(stream){  
  // 		video.src = window.webkitURL.createObjectURL(stream);  
  // 		video.play();  
  // 	}, errBack);  
  // }  
		$("#mcanvas").css('width','100%');
		$("#mcanvas").css('height','100%');

		$("#mcanvas").fadeIn();

		if(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
	       //调用用户媒体设备, 访问摄像头
			//width height需调整{width: 320, height: 480}
			// var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	       getUserMedia({video: {facingMode: 'user','width':'320','height':'480'}} , success, error);

	     } 
		else {
	       alert('不支持访问用户媒体（摄像头）');
	       play();
	     }  	

}
function play() {
	c_flag = 0;
	//此处播放音频
	
	//“魔镜魔镜，请问”
	ID0 = setTimeout(function () {
		c_flag = 1;
		if(BEGINNING)
		$("#tb").fadeIn();
		if(BEGINNING)
		$("#ask1").fadeIn(2000,function () {
			if(BEGINNING)
			{
			sq.load();
			sq.play();
			}
			if(BEGINNING)
			$("#ask2").fadeIn();
		});
	}, 2000);	
	
	//魔镜做出回答
	ID1 = setTimeout(function () {
		c_flag = 2;
		//问题消失 + 魔镜回答显示
		$("#ask1").fadeOut(function () {
			$("#tb").fadeOut();
			if(BEGINNING)
			$("#ask2").fadeOut(function () {
				if(BEGINNING)
				$("#res1").fadeIn(1000,function () {
					$("#res1").slideUp(1000);
					if(BEGINNING)
					$("#res2").fadeIn(1000,function () {
						$("#res2").slideUp(1000);
						if(BEGINNING)
						$("#res3").fadeIn(1000,function () {
							$("#res3").slideUp(1000);
							if(BEGINNING)
							$("#res4").fadeIn(1000,function () {
								$("#res4").slideUp(1000);
								if(BEGINNING)
								$("#res5").fadeIn(1000);
							})
						});
					})
				});
			});
		});
	},10000);
	//关闭此场景，进入健身房
	ID2 = setTimeout(function () {
		$("#skip-outer").hide();
		$("#skip").hide();
		
		c_flag = -1;
		if(BEGINNING)
		$("#res5").animate({'width':'50%','bottom':'380px','left':'130px','opacity':'1.0'},1000,function () {
			if(BEGINNING) $("#mcanvas").fadeOut();
			if(BEGINNING) atGym.begin();
			if(BEGINNING) $("#res5").fadeOut(5000);
		});
		//进入健身房
	}, 20000);
	
	requestNextAnimationFrame(animate);
}
function end() {
	c_flag = -1;
	video.src = "";

	$("#mcanvas").hide();
}

function keepAnimate() {
	c_flag = 0;
	requestNextAnimationFrame(animate);
}


return {begin:begin,
	end:end,
	keepAnimate:keepAnimate,
	show_choice:show_choice};
})();