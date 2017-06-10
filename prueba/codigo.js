var a = screen.height;
var b = screen.width;

function LineaCole(tCole){
	this.tEntreCole = tCole
	this.tHastaProxCole = 0
   	this.colectivos = new Array()
   	// se necesitan agregar
   	this.paradas = new Array()
   	// se necesitan agregar
   	this.tEntreParadas = new Array()
   	// se necesitan agregar
   	this.idsColes = new Array()
   	this.usoIds = new Array()

   	this.addTiempoEntreParadas = function(tEntreParadas){
   		for (var i = 0; i <= tEntreParadas.length; i++) {
 			this.tEntreParadas.push(tEntreParadas[i]) 
   		}
   	}
   	this.addParadas = function(listaParadas){
   		for (var i = 0; i <= listaParadas.length; i++) {
   			this.paradas.push(listaParadas[i])
   		}
   	}
   	this.addIdsColectivos = function(idsColes){
   		for (var i = 0; i <= idsColes.length; i++) {
   			this.idsColes.push(idsColes[i])
   			this.usoIds.push(false)
   		}
   	}
   	this.addColectivo = function() {
   		if (this.tHastaProxCole <= 0) {
   			var j = this.hayColesInactivos()
   			if (j >= 0) {
   				this.usoIds[j] = true
   				var colectivo = new Colectivo(this.idsColes[j])
   				for (var i = 0; i <= this.paradas.length; i++) {
   					colectivo.addParada(this.paradas[i])
   				}
   				colectivo.addTEC(this.tEntreParadas)
   				this.colectivos.push(colectivo)
   				this.tHastaProxCole = this.tEntreCole
   				return 0
   			}
   		}
   		this.tHastaProxCole = this.tHastaProxCole - 1 
   		return -1
 	}
 	this.hayColesInactivos = function(){
 		for (var i = 0; i <= this.usoIds.length; i++) {
 			if (!this.usoIds[i]){
 				return i
 			}
 		}
 		return -1
 	}
 	this.printColectivos = function(){
 		for (var i = 0; i <= this.colectivos.length; i++) {
 			var result = false
 			if (this.colectivos.length > 0){
 				if(this.colectivos[i] != null){
					result = this.colectivos[i].printCole();
 					this.colectivos[i].sumarTiempo();	
 					if(!result){
 						var id = this.colectivos[i].getId();
 						this.colectivos.splice(i,1);
 						this.sacarId(id);
 					}
 				}
 			}
 		}
 	}
 	this.sacarId = function(id){
 		for (var i = 0; i <= this.idsColes.length; i++) {
 			if (this.idsColes[i] == id) {
 				this.usoIds[i] = false
 			}
 		}
 	}
}

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
    	this.tiempoOperativo = 0

    this.getTiempoOperativo = function(){
    	return this.tiempoOperativo
    }
    this.sumarTiempo = function(){
    	this.tiempoOperativo = this.tiempoOperativo + 1
    }
    this.getId = function(){
    	return this.idCole;
    }
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
 	this.printCole = function(){
 		var entro = false
 		for (var i = 0; i < this.tParadas.length; i++) {
 		 	if (this.tiempoOperativo < this.tParadas[i+1] && this.tiempoOperativo >= this.tParadas[i]){
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

var tiempoParadas146 = [4,5,6,3,2,1,1,1,3,2];
var cole_1_146 = new Colectivo("cole1_146");
cole_1_146.addTEC(tiempoParadas146)

var tiempoParadas152 = [2,3,2,3,2,3,2,3,2,3];
var cole_1_152 = new Colectivo("cole1_152");
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



paradas_146 = [new Parada(60,150),new Parada(90,170),new Parada(115,190),
				new Parada(130,200),new Parada(170,200),new Parada(190,210),
				new Parada(210,180),new Parada(230,200),new Parada(260,210),
				new Parada(290,200),new Parada(290,170)];

paradas_152 = [new Parada(60,40),new Parada(90,25),new Parada(115,70),
				new Parada(130,100),new Parada(170,100),new Parada(190,110),
				new Parada(210,140),new Parada(230,100),new Parada(260,60),
				new Parada(290,60),new Parada(290,120)];
tiempo_146 = 0
tiempo_152 = 0

ids_146 = ["cole1_146","cole2_146","cole3_146"]
ids_152 = ["cole1_152","cole2_152","cole3_152"]

//var tiempoParadas152 = [2,3,2,3,2,3,2,3,2,3];

var Linea152 = new LineaCole(10);
var Linea146 = new LineaCole(12);

Linea146.addParadas(paradas_146)
Linea152.addParadas(paradas_152)

Linea146.addIdsColectivos(ids_146)
Linea152.addIdsColectivos(ids_152)

Linea146.addTiempoEntreParadas(tiempoParadas146)
Linea152.addTiempoEntreParadas(tiempoParadas152)

var tiempo = 0
main()
function main(){
	Linea146.addColectivo()
	Linea146.printColectivos()
	Linea152.addColectivo()
	Linea152.printColectivos()



	// result_152 = cole_1_152.printCole(tiempo_152)
	// if (!result_152){
	// 	tiempo_152 = -1
	// }
	// tiempo_152 = tiempo_152 + 1

	// result_146 = cole_1_146.printCole(tiempo_146)
	// if (!result_146){
	// 	tiempo_146 = -1
	// }
	// tiempo_146 = tiempo_146 + 1

	setTimeout(main,1000)
}








