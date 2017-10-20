$(function(){
	$("#header_content div").eq(0).show();
	$(".dot").click(function(){
		$(".dot").removeClass("active");
	})
	$("#dot1").click(function(){
		$(this).addClass("active");
		$("#beijing1").show();
	});
	$("#dot2").click(function(){
		$(this).addClass("active");
	});
	$("#dot3").click(function(){
		$(this).addClass("active");
	});
	$("#dot4").click(function(){
		$(this).addClass("active");
	});

})