var a = screen.height
var b = screen.width
var div = document.getElementById("cole1");
div.style.left = '10px'

function prueba(){
//for (var i = 0; i >= 50; i++) {
	document.getElementById("cole1").style.left = document.getElementById("cole1").style.left + '20px';
}

var timerINT = 500 
function interval1(){
  clearTimeout(timerID)
  prueba()
  timerID = setTimeout("interval1()",timerINT)
}