window.onload= function(){
	var allwidth=0;
	$("#roll_1 li").each(function(){
		allwidth+=$(this).width();
	});
	$("#roll_1 li").clone().appendTo($("#roll_1")); 
	run(6000);

	function run(interval){
		$("#roll_1").animate({"left":-allwidth},interval,"linear",function(){
			$("#roll_1").css("left",0);
			run(6000);
		});
	}
	$("#section_roll").mouseenter(function(){ 
    $("#roll_1").stop(); })
    .mouseleave(function(){ 
      	var passedCourse = -parseInt($("#roll_1").css("left")); 
        var time = 6000 * (1 - passedCourse/segmentWidth); 
      	run(time); 
    }); 
  }; 
















});
