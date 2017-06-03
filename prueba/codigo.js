var a = screen.height;
var b = screen.width;

// function LineaCole(tCole){
// 	this.tECole = tCole
//    	this.colectivos = []
//    	this.addColectivo = function(colectivo) { 
// 		this.colectivos.push(colectivo);
//  	}
// }
function Parada(posx,posy){
   	this.x = posx;
   	this.y = posy;
	this.getX = function() { 
		return this.x;
    }
   	this.getY = function() { 
		return this.y;
    }
}
function Colectivo(idCole){
    	this.tEntreParadas = [];
    	this.tParadas = new Array();
    	this.paradas = new Array();
    	this.idCole = idCole;

	this.addParada = function(parada) { 
		this.paradas.push(parada);
 	}
	this.addTEC = function(listaTEP) { 
		var tInic = 0
		for (var i = 0; i <= listaTEP.length; i++) {
			this.tEntreParadas.push(listaTEP[i])
			this.tParadas.push(tInic);
			tInic = tInic + this.tEntreParadas[i]	

		}
	}
 	this.printCole = function(tiempo){
 		var entro = false
 		for (var i = 0; i < this.tParadas.length; i++) {
 		 	if (tiempo < this.tParadas[i+1] && tiempo >= this.tParadas[i]){
 		 		document.getElementById(this.idCole).style.left = this.paradas[i].getX().toString() + "px";
 		 		document.getElementById(this.idCole).style.top = this.paradas[i].getY().toString() + "px";
 				entro = true
 				return true
 			}
 		}
 		if (!entro){	
 			return false
 		}
 	}
}

// var Linea152 = new LineaCole(3);
// var Linea105 = new LineaCole(4);
// var Linea146 = new LineaCole(5);

//document.write(tiempoParadas105.toString())
// tiempoParadas105 = [1,4,3,2,5,6,3,2,1,1]
// tiempoParadas146 = 
var tiempoParadas146 = [4,5,6,3,2,1,1,1,3,2];
var cole_1_146 = new Colectivo("cole2");
cole_1_146.addTEC(tiempoParadas146)

var tiempoParadas152 = [2,3,2,3,2,3,2,3,2,3];
var cole_1_152 = new Colectivo("cole1");
cole_1_152.addTEC(tiempoParadas152);



var Parada_1_152 = new Parada(60,40);
var Parada_2_152 = new Parada(90,25);
var Parada_3_152 = new Parada(115,70);
var Parada_4_152 = new Parada(130,100);
var Parada_5_152 = new Parada(170,100);
var Parada_6_152 = new Parada(190,110);
var Parada_7_152 = new Parada(210,140);
var Parada_8_152 = new Parada(230,100);
var Parada_9_152 = new Parada(260,60);
var Parada_10_152 = new Parada(290,60);
var Parada_11_152 = new Parada(290,120);
cole_1_152.addParada(Parada_1_152)
cole_1_152.addParada(Parada_2_152)
cole_1_152.addParada(Parada_3_152)
cole_1_152.addParada(Parada_4_152)
cole_1_152.addParada(Parada_5_152)
cole_1_152.addParada(Parada_6_152)
cole_1_152.addParada(Parada_7_152)
cole_1_152.addParada(Parada_8_152)
cole_1_152.addParada(Parada_9_152)
cole_1_152.addParada(Parada_10_152)

var Parada_1_146 = new Parada(60,150);
var Parada_2_146 = new Parada(90,170);
var Parada_3_146 = new Parada(115,190);
var Parada_4_146 = new Parada(130,200);
var Parada_5_146 = new Parada(170,200);
var Parada_6_146 = new Parada(190,210);
var Parada_7_146 = new Parada(210,180);
var Parada_8_146 = new Parada(230,200);
var Parada_9_146 = new Parada(260,210);
var Parada_10_146 = new Parada(290,200);
var Parada_11_146 = new Parada(290,170);
cole_1_146.addParada(Parada_1_146)
cole_1_146.addParada(Parada_2_146)
cole_1_146.addParada(Parada_3_146)
cole_1_146.addParada(Parada_4_146)
cole_1_146.addParada(Parada_5_146)
cole_1_146.addParada(Parada_6_146)
cole_1_146.addParada(Parada_7_146)
cole_1_146.addParada(Parada_8_146)
cole_1_146.addParada(Parada_9_146)
cole_1_146.addParada(Parada_10_146)


tiempo_146 = 0
tiempo_152 = 0
main()
function main(){
	result_152 = cole_1_152.printCole(tiempo_152)
	if (!result_152){
		tiempo_152 = -1
	}
	tiempo_152 = tiempo_152 + 1

	result_146 = cole_1_146.printCole(tiempo_146)
	if (!result_146){
		tiempo_146 = -1
	}
	tiempo_146 = tiempo_146 + 1
	setTimeout(main,1000)
}








