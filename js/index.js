  //下载快乐购app
    $(".d_l_hgp").hover(function () {
        $(".down_load_hpg").show();
    }, function () { $(".down_load_hpg").hide(); });
    
    
    //客服中心下拉框
    $(".cus_c_box").hover(function () {
        $(this).addClass("cus_c_border");
        $(".cus_center").show();
    }, function () {
        $(this).removeClass("cus_c_border");
        $(".cus_center").hide();
    });
    
    //展开分类
	$(".li_all_type").hover(function(){
		$(".index_type").show();
	},function(){
		if(!$(".index_type").is(':hidden'))
		{
			$(".index_type").hide();
		}
	});
	
	$(".index_type").hover(function(){
		$(".index_type").show();
	},function(){
		$(".index_type").hide();
	});
	
    //首页分类下拉框
    $(".index_type_ul .li_has_down").hover(function () {
        $(this).addClass("cur");
        $(this).find(".nav_type_list").show();
    }, function () {
        $(this).removeClass("cur");
        $(this).find(".nav_type_list").hide();
    });
    
    //轮播图
	var timer = setInterval(autoPlay,2000);
	var index= 0;
	function autoPlay(){
		index++;
		$("#img-list > li").eq(index).fadeIn(100).siblings().fadeOut(100);
		$("#banner-nav-list > span").eq(index).addClass("on").siblings().removeClass("on");
		if(index == $("#img-list > li").length - 1){
			index = -1;
		}
	}
	$("#banner-nav-list > span").mouseenter(function(){
		clearInterval(timer);
		//console.log($(this).index());
		index = $(this).index()-1;
		autoPlay()
	}).mouseleave(function(){
		timer = setInterval(autoPlay,1000);
	});
	

	
