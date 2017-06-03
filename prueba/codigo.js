var a = screen.height
var b = screen.width
document.getElementById("cole1").style.left= String(100) + "px";
prueba()
a = 100
function prueba(){	
		a = a + 10	
		document.getElementById("cole1").style.left= String(a) + "px";
		setTimeout(prueba,2000)
}
