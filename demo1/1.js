flag=true;
flag1=true;
function displayDiv() 
{ 	
	var div=document.getElementById("login"); 
	if(flag)
	{
		div.style.display="block"; 
		document.getElementById("sign1").style.display="none";
	}
	else 
		div.style.display="none"; 
	flag=!flag; 
}

function displayDiv1() 
{ 	
	var div1=document.getElementById("sign1"); 
	if(flag1) 
	{	div1.style.display="block"; 
	    document.getElementById("login").style.display="none";
	}
	else
	{
		div1.style.display="none"; 
	} 
	flag1=!flag1; 
}
       
