$(function(){
	//----------------导航栏动画----------------
	var win=$(window);
	var dc=$(document);
	win.scroll(function(){
		if(dc.scrollTop()>=250){
			$(".nav_ul").addClass("nav_fix");
			$(".nav_li img").attr("src","image/logo02.png");
			$(".nav_a").removeClass("active");
			$(".nav_a1").addClass("active");
		}
		if(dc.scrollTop()<250){
			$(".nav_ul").removeClass("nav_fix");
			$(".nav_li img").attr("src","image/logo1.png");
			$(".nav_a").removeClass("active");
		}
		if(dc.scrollTop()>=1400){
			$(".nav_a").removeClass("active");
			$(".nav_a2").addClass("active");
		}
		if(dc.scrollTop()>=1900){
			$(".nav_a").removeClass("active");
			$(".nav_a3").addClass("active");
		}
		if(dc.scrollTop()>=2400){
			$(".nav_a").removeClass("active");
			$(".nav_a4").addClass("active");
		}

	});
	//----------------蓝线动画--------------------------
    $("#yidong_ul1").click(function(){
    $(".alltext").removeClass("acctive");
    $("#yidong_text1").addClass("acctive");
    $(".yidong_lanxian").css("width","54px");
    $(".yidong_lanxian").css("transform","translateX(0px)");
	});
    $("#yidong_ul2").click(function(){
    $(".alltext").removeClass("acctive");
    $("#yidong_text2").addClass("acctive");
    $(".yidong_lanxian").css("width","64px");
    $(".yidong_lanxian").css("transform","translateX(94px)");
    });
    $("#yidong_ul3").click(function(){
    $(".alltext").removeClass("acctive");
    $("#yidong_text3").addClass("acctive");
    $(".yidong_lanxian").css("width","64px");
    $(".yidong_lanxian").css("transform","translateX(198px)");
    });
    $("#yidong_ul4").click(function(){
    $(".alltext").removeClass("acctive");
    $("#yidong_text4").addClass("acctive");
    $(".yidong_lanxian").css("width","102px");
    $(".yidong_lanxian").css("transform","translateX(304px)");
    });
    //--------格子动画--------------
    var gezi=function(){
      $(".final_li").removeClass("in").removeClass("out");
      $(".final_con a").removeClass("active");
    }
    $(".mouse_qidian").mouseover(function(){
    	gezi();
    	$(this).addClass("active");
      $(".li_qidian").addClass("in");
    });
     $(".mouse_chuangshi").mouseover(function(){
     	$(".final_li").removeClass("in").removeClass("out");
     	$(".final_con a").removeClass("active");
    	$(this).addClass("active");
      $(".li_chuangshi").addClass("in");
    });
      $(".mouse_yunqi").mouseover(function(){
     	$(".final_li").removeClass("in").removeClass("out");
     	$(".li_yunqi").addClass("in");
     	$(".final_con a").removeClass("active");
    	$(this).addClass("active");
    });
});
