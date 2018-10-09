window.onload=function(){
	var odiv = document.getElementById('section_roll');
	var oul = odiv.getElementsByTagName('ul')[0];
	var ali = oul.getElementsByTagName('li');
	var spa = -1;				
	oul.innerHTML=oul.innerHTML+oul.innerHTML;
	function move(){
		if(oul.offsetLeft<-oul.offsetWidth/2){
			oul.style.left='0';
		}
			oul.style.left=oul.offsetLeft+spa+'px';
		}
	var timer = setInterval(move,30)
	odiv.onmousemove=function(){clearInterval(timer);}
	odiv.onmouseout=function(){timer = setInterval(move,30)};
	var odiv2 = document.getElementById('section_roll2');
	var oul2 = odiv2.getElementsByTagName('ul')[0];
	var ali2 = oul2.getElementsByTagName('li');
	var spa2 = -1;				
	oul2.innerHTML=oul2.innerHTML+oul2.innerHTML;
	function move2(){
		if(oul2.offsetLeft<-oul2.offsetWidth/2){
			oul2.style.left='0';
		}
			oul2.style.left=oul2.offsetLeft+spa2+'px';
		}
	var timer2 = setInterval(move2,40)
	odiv2.onmousemove=function(){clearInterval(timer2);}
	odiv2.onmouseout=function(){timer2 = setInterval(move2,40)};
}
