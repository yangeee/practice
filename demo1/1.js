$(document).ready(function(){
$('#111').click(function(event){
		event.stopImmediatePropagation();//取消事件冒泡；
		$("#login").toggle(0); 
		$("#sign1").hide();
	});
$("#222").click(function(){
		event.stopImmediatePropagation();//取消事件冒泡；
		$("#sign1").toggle(0); 
		$("#login").hide();   
	});

 
$(document).bind("click",function(){
    $('#sign1').hide();
    $('#login').hide();
})
});