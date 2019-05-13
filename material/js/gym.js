
var atGym = (function atGym(){
	var gym_flag = false;
	
	var gym_bg = new Image();
	gym_bg.src = "material/images/gym.png";
	
	var gym_init = new Image();
	gym_init.src = "material/images/gym-init.png";

	
	var rs_sound = document.getElementById("rs");
var heartbeat_sound = document.getElementById("hb");
	rs_sound.volume = 0.1;

var ropeskipping_Cells = [{ left: 0,   top: 0, width: 428.5, height: 442 },
{ left: 428.5,  top: 0, width: 428.5, height: 442 },
{ left: 428.5*2, top: 0, width: 428.5, height: 442 },
{ left: 428.5*3, top: 0, width: 428.5, height: 442 },
{ left: 428.5*4, top: 0, width: 428.5, height: 442 },
{ left: 428.5*5, top: 0, width: 428.5, height: 442 },
{ left: 428.5*6, top: 0, width: 428.5, height: 442 }
];
var ropeskipping_Cells_s = [{ left: 0,   top: 442, width: 428.5, height: 442 },
{ left: 428.5,  top: 442, width: 428.5, height: 442 },
{ left: 428.5*2, top: 442, width: 428.5, height: 442 },
{ left: 428.5*3, top: 442, width: 428.5, height: 442 },
{ left: 428.5*4, top: 442, width: 428.5, height: 442 },
{ left: 428.5*5, top: 442, width: 428.5, height: 442 },
{ left: 428.5*6, top: 442, width: 428.5, height: 442 }
];
var barbell_Cells = [{ left: 0,   top: 884, width: 428.5, height: 442 },
{ left: 428.5,  top: 884, width: 428.5, height: 442 },
{ left: 428.5*2, top: 884, width: 428.5, height: 442 },
{ left: 428.5*3, top: 884, width: 428.5, height: 442 },
{ left: 428.5*4, top: 884, width: 428.5, height: 442 },
{ left: 428.5*5, top: 884, width: 428.5, height: 442 },

];
var barbell_Cells_s = [{ left: 0,   top: 1326, width: 428.5, height: 442 },
{ left: 428.5,  top: 1326, width: 428.5, height: 442 },
{ left: 428.5*2, top: 1326, width: 428.5, height: 442 },
{ left: 428.5*3, top: 1326, width: 428.5, height: 442 },
{ left: 428.5*4, top: 1326, width: 428.5, height: 442 },
{ left: 428.5*5, top: 1326, width: 428.5, height: 442 },

];


	var pc ; //比例
	var begin_time = 0;//进入健身房的时间
	
	var jump_speed = 0;
	var bell_speed = 0;
	
	var heart_rate = 0;
	var heart_size = 30;//心率图标的大小
	
	var SPEED_CAL_INTERVAL = 1000;//速度更新的时间间隔
	var TEXT_INTERVAL = 3000;
	var SPEED_TIMES = 25;//跳的次数*倍数 = 可视速度
	var SPEED_STEP = 2;//改变速度的幅度
	var ROPE_LIMIT = 100;//跳几下会开始出汗
	
	var rope_count = 0;//跳了几下	
	var last_rope_count = 0;
	var barbell_count = 0;
	var last_barbell_count = 0;
	
	var up0_down1 = -1;
	
	var tot_seconds = 0;
	
	var last_time = 0;
	var last_text_time = 0;
	var text_to_show = "";

	var Tpoint = {startX:0,startY:0,endX:0,endY:0,x:0,y:0};
	
	var CAL_PER_KG_H = 7000;
	var XDH_WEIGHT = 90;
	var cal = 0;//累计消耗的卡路里
	var touch_pics = 2;
	
	var doBarbellInPlace = {
		lastAdvance: 0,
		PAGEFLIP_INTERVAL: 80,

		execute: function (sprite, context, time) {
			if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
//				if(rope_count >= ROPE_LIMIT){
//					spritesheet.src="images/ropeskipping-sheet-s.png";
//				}
sprite.painter.advance();
if(sprite.painter.cellIndex==3) {
//					rs_sound.load();
//					rs_sound.play();
barbell_count++;
					//计算卡路里
//					cal += (3 + jump_speed)/60;
//					cal += 100*(3 + jump_speed)/60;

}
this.lastAdvance = time;
}
}
},
doRopeskippingInPlace = {
	lastAdvance: 0,
	PAGEFLIP_INTERVAL: 50,

	execute: function (sprite, context, time) {
		if (time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
			if(rope_count >= ROPE_LIMIT){
				sprite.painter.cells = ropeskipping_Cells_s;
			}
			sprite.painter.advance();
			if(sprite.painter.cellIndex==sprite.painter.cells.length-1) {
					rs_sound.load();
					rs_sound.play();
rope_count++;
					//计算卡路里
//					cal += (3 + jump_speed)/60;
//					cal += 100*(3 + jump_speed)/60;

}
this.lastAdvance = time;
}
}
};

var B_sprite = new Sprite('xdh',new SpriteSheetPainter(barbell_Cells),[ doBarbellInPlace ]);
var R_sprite = new Sprite('xdh',new SpriteSheetPainter(ropeskipping_Cells),[ doRopeskippingInPlace ]);


	//事件处理函数.............................................
	function touch_to_jump(e) {
		//第一次跳才开始计时
		e.preventDefault();

		if(begin_time == 0) begin_time = new Date();

		var now_time = new Date();
		R_sprite.update(vctx, now_time);
	}	
	function onTouchstart(e){
		//第一次举才开始计时
		if(begin_time == 0) begin_time = new Date();

		e.preventDefault();
		Tpoint.startX = e.touches[0].pageX;
		Tpoint.startY = e.touches[0].pageY;
	}
	function onTouchmove(e) {
		
		e.preventDefault();
		Tpoint.endX = e.changedTouches[0].pageX;
		Tpoint.endY = e.changedTouches[0].pageY;
		
		Tpoint.x = Tpoint.endX - Tpoint.startX;
		Tpoint.y = Tpoint.endY - Tpoint.startY;
		
		if(Tpoint.y > 0){
			//向下滑
			up0_down1 = 1;
		}
		else{
			//向上滑
			up0_down1 = 0;
		}
	}
	function onTouchend(e) {
		e.preventDefault();
//		up0_down1 = -1;
}
	//功能函数..........................................
	function drawMirrorMessages(mode) {
		
		vctx.textBaseline = "middle";
		vctx.textAlign="left";
		vctx.font="24px Wawati SC";
		
		//1.跳绳个数、举杠铃个数
		vctx.save();
		
		vctx.fillText("夏东海的运动数据：",64,60 + (vcanvas.height-gym_bg.height/pc)/2);
		if(mode==0)
			vctx.fillText("跳绳 " + rope_count+" 下 ", 64, 95 + (vcanvas.height-gym_bg.height/pc)/2);
		else if(mode==1)
			vctx.fillText("举杠铃 " + barbell_count + " 下 " , 64, 95 + (vcanvas.height-gym_bg.height/pc)/2);

//		vctx.fillText("Speed",64,217 + (vcanvas.height-gym_bg.height/pc)/2);
//		vctx.strokeRect(141, 212 +(vcanvas.height-gym_bg.height/pc)/2,102 , 14);
		
		vctx.restore();
		
		//2.速度
		//关于速度需要再制定方案 
//		vctx.save();
//		vctx.fillRect(142, 213 + (vcanvas.height-gym_bg.height/pc)/2,Math.max(jump_speed,bell_speed)*SPEED_TIMES, 12);
//		vctx.restore();

		//3.1心率图标
		vctx.save();
		vctx.textAlign="center";
		vctx.font=heart_size + "px Wawati SC";
		vctx.fillText("❤",95,190+10 + (vcanvas.height-gym_bg.height/pc)/2);
		vctx.restore();
		
		//3.2心率值
		vctx.save();
		vctx.font="30px Wawati SC";
		if(heart_rate>120){
			vctx.fillStyle="red";
		}
		vctx.fillText(heart_rate,150,189+10 + (vcanvas.height-gym_bg.height/pc)/2);
		vctx.restore();
		
		//4.运动时长 卡路里 
		vctx.save();
		var now_time = new Date();
		var tot_minutes = parseInt(tot_seconds/60);
		vctx.fillText("您已运动 " + tot_minutes + " 分钟 "+ tot_seconds%60 + " 秒",64,258 + (vcanvas.height-gym_bg.height/pc)/2);
		if(tot_minutes!=0||tot_seconds!=0) cal = CAL_PER_KG_H/XDH_WEIGHT*((tot_minutes+tot_seconds/60)/60);
		vctx.fillText("消耗约 " + parseInt(cal*1000)/1000 + " 卡路里" ,64, 295 + (vcanvas.height-gym_bg.height/pc)/2);

		vctx.restore();

		//5.建议 提示 文字
		vctx.save();
		//报警需要及时
		if(heart_rate>120){
			vctx.font="38px Wawati SC";
			vctx.fillText("❗️",58,142 + (vcanvas.height-gym_bg.height/pc)/2);
			vctx.font = "25px Wawati SC ";
			vctx.fillText("当前心率过高",90,128 + (vcanvas.height-gym_bg.height/pc)/2);
			vctx.fillText("建议适当降低运动强度",90,152 + (vcanvas.height-gym_bg.height/pc)/2);
			
			 heartbeat_sound.play();
		}
		//否则每隔TEXT_INTERVAL 更新一次
		else {
			 heartbeat_sound.pause();
			
			vctx.font = "23px Wawati SC";

			if(now_time - last_text_time > TEXT_INTERVAL){
				last_text_time = now_time;
				if(mode!=undefined){
					if(mode===0){
						var text1 = ["跳绳比跑步还燃脂","跳绳是一项全身参与的运动","跳完绳一定记得要拉伸","跳绳减肥一定要适度","跳绳会使心血管系统得到锻炼",
						"加油，试着加快速度！","要学会用小臂以及腕部的力量","心率太低的话就试着加快速度","身体上部保持平衡，不要左右摆动","跳绳时应该用前脚掌起跳和落地",
						"不需要拼命跳高，刚好通过才叫厉害","要学会用小臂以及腕部的力量","注意呼吸的节奏！","要学会用小臂以及腕部的力量","跳绳时注意力必须高度集中",
						"坚持就是胜利！","需要拼命跳高，刚好通过才叫厉害","脂肪正在燃烧，再接再厉！","呼吸要自然有节奏","跳绳可以让全身肌肉匀称有力",
						"相信付出，时间会给你美丽的蜕变","脂肪正在燃烧，再接再厉！","坚持就是胜利！","集中精力，分配力量，平衡速度！","注意呼吸的节奏！",
						];
						text_to_show = text1[parseInt(Math.random()*5)+5*jump_speed];
					}
					else if(mode===1){
						var text2 = ["相信付出，时间会给你美丽的蜕变","脂肪正在燃烧，再接再厉！","坚持就是胜利！","集中精力，分配力量，平衡速度！","呼吸要自然有节奏",
						"双手保持手掌朝下紧握杠铃","躯干部位始终保持静止不动","保持背部直立","当进行至最高位置时稍做停顿"];
						text_to_show = text2[parseInt(Math.random()*text2.length)];

					}
				}

			}		
			vctx.fillText("💡",60,142 + (vcanvas.height-gym_bg.height/pc)/2);

			vctx.fillText(text_to_show,88,140 + (vcanvas.height-gym_bg.height/pc)/2);			
			vctx.restore();

		//6.
	}
}
function showReport() {

		//传递运动数据
		document.getElementById("sn1").innerHTML = rope_count;
		document.getElementById("sn2").innerHTML = barbell_count;
		document.getElementById("sn3-m").innerHTML = parseInt(tot_seconds/60);
		document.getElementById("sn3-s").innerHTML = tot_seconds%60;
		document.getElementById("sn4").innerHTML = parseInt(cal*1000)/1000;

		var percent;
		if(cal == 0) percent = 0;
		else if(cal<=1) percent = parseInt(Math.random()*50);
		else if(cal<=10) percent = parseInt(Math.random()*30+50);
		else {
			percent = parseInt(Math.random()*20+80);
		}
		
		if(percent>=100) percent = 99.9;
		document.getElementById("sn5").innerHTML = percent+"%";
		//动画特效
		$("#reportBox").css({'display':'flex',
			'width':'0',
			'height':'0',
			'top':'50%',
			'left':'50%',
			'opacity':'0'	
		});
		
		$("#reportBox").animate({'width':'80%',
			'height':'80%',
			'top':'10%',
			'left':'10%',
			'opacity':'1.0'},1000);
	}
	//动画函数..........................................
	function jumping() {
		vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
		vctx.drawImage(gym_bg,0,(vcanvas.height-gym_bg.height/pc)/2,gym_bg.width/pc,gym_bg.height/pc);

		var now_time = new Date();
		if (now_time - last_time >= SPEED_CAL_INTERVAL) {
			jump_speed = (rope_count - last_rope_count);
			bell_speed = (barbell_count - last_barbell_count);
			if(jump_speed != 0 || bell_speed != 0) tot_seconds++;
			last_time = now_time;
			last_rope_count = rope_count;
			last_barbell_count = barbell_count;
			heart_rate = parseInt(Math.random()*13) + 75 + 13 * jump_speed;
			heart_size = heart_size==30?38:30;
			if(jump_speed < 2){
				R_sprite.painter.cells = ropeskipping_Cells;
			}
			else if(jump_speed >= 2){
				R_sprite.painter.cells = ropeskipping_Cells_s;

			}
		}
		drawMirrorMessages(0);

		if(R_sprite.painter.cellIndex != R_sprite.painter.cells.length-2){
			R_sprite.update(vctx, now_time);
		}
		R_sprite.paint(vctx); 
		if(gym_flag)requestNextAnimationFrame(jumping);
		else vctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
	}

	function belling() {
		vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
		vctx.drawImage(gym_bg,0,(vcanvas.height-gym_bg.height/pc)/2,gym_bg.width/pc,gym_bg.height/pc);

		var now_time = new Date();
		if (now_time - last_time >= SPEED_CAL_INTERVAL) {
			jump_speed = (rope_count - last_rope_count);
			bell_speed = (barbell_count - last_barbell_count);
			if(jump_speed != 0 || bell_speed != 0) tot_seconds++;			
			last_time = now_time;
			last_rope_count = rope_count;
			last_barbell_count = barbell_count;

			heart_rate = parseInt(Math.random()*13) + 75 + 13 * bell_speed;
			
			heart_size = heart_size==30?38:30;
			
			if(bell_speed < 1){

				B_sprite.painter.cells = barbell_Cells;
			}
			else if(bell_speed >= 1){
				B_sprite.painter.cells = barbell_Cells_s;
			}
		}
		drawMirrorMessages(1);
		if(up0_down1 === 0){
			if(B_sprite.painter.cellIndex != 3){
				B_sprite.update(vctx, now_time);
			}
			else {
				up0_down1 = -1;
			}
		}
		else if(up0_down1 === 1){
			if(B_sprite.painter.cellIndex != 0){
				B_sprite.update(vctx, now_time);
			}
			else{
				up0_down1 = -1;
			}
		}
		B_sprite.paint(vctx); 

		if(gym_flag)requestNextAnimationFrame(belling);
		else vctx.clearRect(0, 0, vcanvas.width, vcanvas.height);

	}
	
	function begin_R() {
		$("#suggest-text").hide();	

		$("#ts-text").show();
		$("#mask").fadeIn(500,function(){
			$("#ts-text").fadeOut(3000);
			$("#mask").fadeOut(3000);

		});

		// $("#ts-text").css({'width':'0','top':'50%','left':'50%','display':'block'});
		// $("#ts-text").animate({'width':'100%','left':'0'},2000,function(){
		// 	$("#ts-text").fadeOut(2000);
		// 	$("#suggest-text").hide();	

		// });				


		//切换到跳绳模块

		R_sprite.left = 137;
		R_sprite.top = 405;	
		R_sprite.width = 470;
		vcanvas.removeEventListener("touchstart",onTouchstart);
		vcanvas.removeEventListener("touchmove",onTouchmove);
		vcanvas.addEventListener("touchstart", touch_to_jump);	

		gym_flag = true;
		requestNextAnimationFrame(jumping);
	}
	function begin_B() {
		//切换到跳绳模块	
		$("#suggest-text").hide();	

		$("#gl-text").show();
		$("#mask").fadeIn(500,function(){
			$("#gl-text").fadeOut(3000);
			$("#mask").fadeOut(3000);

		});

		// $("#gl-text").css({'width':'0','top':'50%','left':'50%','display':'block'});

		// $("#gl-text").animate({'width':'100%','left':'0'},2000,function(){
		// 	$("#gl-text").fadeOut(2000);
		// 	$("#suggest-text").hide();					

		// });
		
		vcanvas.removeEventListener("touchstart", touch_to_jump);		

		vcanvas.addEventListener("touchstart",onTouchstart);
		vcanvas.addEventListener("touchmove",onTouchmove);
		
//		spritesheet.src="images/barbell-sheet.png";

B_sprite.left = 137;
B_sprite.top = 405;	
B_sprite.width = 470;

gym_flag = true;
requestNextAnimationFrame(belling);
}
function begin(){
	document.getElementById("bgm0").pause();
	document.getElementById("bgm1").pause();
	gym_flag = true;
	last_pageY = window.pageYOffset;

	rope_count = 0;
	last_rope_count = 0;
	barbell_count = 0;
	last_barbell_count = 0;

	cal = 0;
	tot_seconds = 0;

	spritesheet.src = "material/images/sheet.png";

		//实现背景不会移动+定位到触屏时的位置
		$("body").css('backgroundPosition','0px ' + (-window.pageYOffset)+'px');
		
		$("#bg").hide();
		$(".bling").hide();	
		//canvas显示，待调整]
		$("#vcanvas").css('width','100%');
		$("#vcanvas").show();
		// $("#vcanvas").animate({width:'100%',opacity:'1.0'},1500,function(){
			//暴力对准，需要找比例
			$("#back").css('top',110+"px");
			$("#back").slideDown();
			$("#sbtn1").show();
			$("#sbtn2").show();
			$("#sbtn-container").show();			
		// });
		
		pc = gym_bg.width/vcanvas.width;

		vctx.drawImage(gym_bg,0,(vcanvas.height-gym_bg.height/pc)/2,gym_bg.width/pc,gym_bg.height/pc);

		vctx.drawImage(gym_init,137,405,470,475);

		// drawMirrorMessages();
		$("#suggest-text").fadeOut("fast");

		$("#suggest-text").fadeIn(100,function(){
			$("#suggest-text").fadeOut(8000,function(){
//				drawMirrorMessages();
			});
		});

		$("#back").unbind();
		$("#back").click(end);
		
		$("#sbtn1").click(function () {

			gym_flag = false;
			$("#sbtn1").addClass("chosen");
			$("#sbtn2").removeClass("chosen");
			begin_R();
		});

		$("#sbtn2").click(function () {
			gym_flag = false;
			$("#sbtn2").addClass("chosen");
			$("#sbtn1").removeClass("chosen");
			begin_B();
		});
	}
	function end() {
		gym_flag = false;
		vctx.clearRect(0,0,vcanvas.width,vcanvas.height);

		$("#sbtn-container").hide();
		$("#sbtn1").removeClass("chosen");
		$("#sbtn2").removeClass("chosen");

		$("#ts-text").hide();
		$("#gl-text").hide();

		$("#suggest-text").hide();
		$(".sitem").hide();

		$("#sportdone-btn div").click(
			function () {
				$("#reportBox").fadeOut();
				if(BEGINNING){
//					$("#vcanvas").hide();
$(".sitem").hide();
$("#mcanvas").fadeIn();
bm.keepAnimate();
bm.show_choice();
}
else{
					//main后的quit
					vctx.clearRect(0,0,vcanvas.width,vcanvas.height);
					$(".sitem").fadeOut();
					$("#bg").show();
					putBling();
					window.scrollBy(0,last_pageY);	
					document.getElementById("bgm0").play();
					document.getElementById("bgm1").play();					
				}
			});
		
		showReport();

	}
	function getStatus() {
		return gym_flag;
	}
	
	return{begin:begin,
		end:end,
		getStatus:getStatus};
	})();