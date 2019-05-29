
//搜索Tab切换
$(".i_search_tab li a").click(function(){
    $(".i_search_tab li a.i_search_tab_focus").removeClass("i_search_tab_focus");
    $(this).addClass("i_search_tab_focus");
});
// 侧边sidebar展开，隐藏
function sideBar() {
	var aSideBar 	= $(".nav_con_l li"),
		aSideBarCon = $(".sidebar_con"),
		timer 		= null;

	for (var i = 0;i < aSideBar.length; i++) {
		aSideBar[i].index = i;
		
		$(aSideBar[i]).mouseover(function(){
				clearTimeout(timer);
				$(this).addClass("activei");
				for (var i = 0;i < aSideBarCon.length; i++) {
					$(aSideBarCon[i]).hide();
				}
				$(aSideBarCon[$(this).index()]).show();
		});
		$(aSideBar[i]).mouseout(function(){
				that = $(this).index();
				$(this).removeClass("activei");
			timer = setTimeout(function() {
				$(aSideBarCon[that]).hide();
			},300);	
		});	
	}

	for (var i = 0; i < aSideBarCon.length; i++) {

		$(aSideBarCon[i]).mouseover(function(event) {
				clearTimeout(timer);
				$(this).show();
				for (var i=0;i < aSideBar.length;i++) {
					$(aSideBar[i]).removeClass("activei")
				}
				$(aSideBar[$(this).index()-2]).addClass("activei")
		});
		$(aSideBarCon[i]).mouseout(function(event) {
				that = $(this);
				for (var i=0;i < aSideBar.length;i++) {
					$(aSideBar[i]).removeClass("activei");
				}
			 	timer = setTimeout(function(){
	                    $(that).hide();
	             },200);
		});
	}
}

function indexTabList() {
	var aLi 	= $(".all_tab li"),
		aCon 	= $(".all_tab_con .bs");

	aLi.click(function(e) {
		var self 	= $(this),
			index 	= self.index();
		
		if ($(e.target).is(".buyer_sale_box .li1")) {
			self.addClass("current").siblings().removeClass("current");
			aCon.eq(index).show().siblings().hide();
		}  
	});
}


// 图片轮播
	jQuery.focus = function(slid) {
		var sWidth = $(slid).width(); //获取焦点图的宽度（显示面积）
		var len = $(slid).find("ul li").size(); //获取焦点图个数
		var index = 0;
		var picTimer;
		//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
		var btn = "<div class='btnBg'></div><div class='btn'>";
		for(var i=0; i < len; i++) {
			var ii = i;
			btn += "<span>"+"</span>";
		}
		btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
		$(slid).append(btn);
		$(slid).find("div.btnBg").css("opacity",1);
	
		//为小按钮添加鼠标滑入事件，以显示相应的内容
		$(slid+" div.btn span").css("opacity",1).mouseenter(function() {
			index = $(slid+" .btn span").index(this);
			showPics(index);
		}).eq(0).trigger("mouseenter");
	
		//上一页、下一页按钮透明度处理
		$(slid+" .preNext").css("opacity",0).hover(function() {
			$(this).stop(true,false).animate({"opacity":"0.5"},300);
		},function() {
			$(this).stop(true,false).animate({"opacity":"0.2"},300);
		});

        $('#focus01').hover(function(){
			$(slid+" .preNext").stop(true).animate({"opacity":"0.2"},300);
		},function(){
			$(slid+" .preNext").stop(true).animate({"opacity":"0"},300);
		})
	
		//上一页按钮
		$(slid+" .pre").click(function() {
			index -= 1;
			if(index == -1) {index = len - 1;}
			showPics(index);
		});
	
		//下一页按钮
		$(slid+" .next").click(function() {
			index += 1;
			if(index == len) {index = 0;}
			showPics(index);
		});
	
		//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
		$(slid+" ul").css("width",sWidth * (len));

		//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
		$(slid).hover(function() {
			clearInterval(picTimer);
		},function() {
			picTimer = setInterval(function() {
				showPics(index);
				index++;
				if(index == len) {index = 0;}
			},4000); //此4000代表自动播放的间隔，单位：毫秒
		}).trigger("mouseleave");
		
		//显示图片函数，根据接收的index值显示相应的内容
		function showPics(index) { //普通切换
			var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
			$('#focus001').find('li').each(function(i){
				if(i==index){
					if($.trim($(this).find('img').attr('src')).length==0){
						$(this).find('img').attr('src',$(this).find('img').attr('data_src'));
					}
				}
			})
			$(slid+" ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
			$(slid+" .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
			$(slid+" .btn span").stop(true,false).animate({"opacity":"1"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
		}
	
	};


$(document).ready(function() {
	sideBar();
	indexTabList();
	$.focus("#focus01");
	// autoPlay('pro_carousel');
})
