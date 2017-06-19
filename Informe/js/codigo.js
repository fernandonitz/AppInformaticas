var a = screen.height;
var b = screen.width;

function LineaCole(tCole,capacidad,cantEsperada){
	this.tEntreCole = tCole
	this.tHastaProxCole = 0
	this.capacidad = capacidad
	this.cantEsperada = cantEsperada
   	this.colectivos = new Array()
   	// se necesitan agregar
   	this.paradas = new Array()
   	// se necesitan agregar
   	this.tEntreParadas = new Array()
   	// se necesitan agregar
   	this.idsColes = new Array()
   	//se necesitan agregar
   	this.idsSobreColes = new Array()
   	this.usoIds = new Array()

   	this.getColectivos = function(){
   		return this.colectivos
   	}
   	this.refresh = function(){
   		this.addColectivo();
   		this.printColectivos();
   	}
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
   	this.addIdsSobreColectivos = function(idsColes){
   		for (var i = 0; i <= idsColes.length; i++) {
   			this.idsSobreColes.push(idsColes[i])
   		}
   	}
   	this.addColectivo = function() {
   		if (this.tHastaProxCole <= 0) {
   			var j = this.hayColesInactivos()
   			if (j >= 0) {
   				this.usoIds[j] = true
   				var colectivo = new Colectivo(this.idsColes[j],this.idsSobreColes[j],this.capacidad,this.cantEsperada)
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
function Colectivo(idCole,idSobreCole,capacidad,cantEsperada){
	this.tEntreParadas = [];
	this.tParadas = new Array();
	this.paradas = new Array();
	this.idCole = idCole;
	this.idSobreCole = idSobreCole;
	this.tiempoOperativo = 0
	this.cantEsperada = cantEsperada
	this.pasajerosTransportados = new Array();
	this.capacidad = capacidad
	this.cantPersonas = 0

	this.promedioGente = function(){
		var prom = 0
		var tiempo = 0
		var cantPersonas = 0
		for (var i = 0; i < this.tParadas.length - 1; i++) {
			tiempo = this.tParadas[i]
		}
		//console.log(this.tParadas)
		//console.log(tiempo)
		for (var j = 0; j < this.pasajerosTransportados.length; j++) {
			cantPersonas = cantPersonas + this.pasajerosTransportados[j]
		}
		//console.log(this.pasajerosTransportados)
		//console.log(cantPersonas)
		prom = cantPersonas/tiempo
		//console.log(prom)
		return prom
	}
	this.sumarPersona = function(cantPersonas){
		this.cantPersonas = this.cantPersonas + cantPersonas
	}
	this.restarPersona = function(cantPersonas){
		if (this.cantPersonas - cantPersonas >= 0){
			this.cantPersonas = this.cantPersonas - cantPersonas
		}
	}
	this.getCantPersonas = function(cantPersonas){
		return this.cantPersonas
	}
	this.sobrecargado = function(){
		if (this.cantPersonas > this.capacidad){
			return true
		}
		return false
	}
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
 				if (this.capacidad<this.cantPersonas){
 					this.pasajerosTransportados.push(this.cantPersonas)
 					document.getElementById(this.idSobreCole).style.left = this.paradas[i].getX().toString() + "px";
 		 			document.getElementById(this.idSobreCole).style.top = this.paradas[i].getY().toString() + "px";
 					if (this.idSobreCole != null){
	 					document.getElementById(this.idSobreCole).style.visibility = "visible"		
 					}
 					document.getElementById(this.idCole).style.visibility = "hidden"	
 				}
 				else{
 					this.pasajerosTransportados.push(this.cantPersonas)
 					document.getElementById(this.idCole).style.left = this.paradas[i].getX().toString() + "px";
 		 			document.getElementById(this.idCole).style.top = this.paradas[i].getY().toString() + "px";
 		 			if (this.idSobreCole != null){
	 					document.getElementById(this.idSobreCole).style.visibility = "hidden"		
 		 			}
 					document.getElementById(this.idCole).style.visibility = "visible"	
 				}
 				entro = true
 				return true
 			}
 		}
 		if (!entro){
 			prom = this.promedioGente()
 			//console.log(prom)
 			//console.log(this.cantEsperada)
 			//console.log(this.pasajerosTransportados)
 			if(this.cantEsperada > prom){
 				console.log("El colectivo transporto menos cantidad de lo esperado")		
 			}
 			if(this.cantEsperada < prom){
 				console.log("El colectivo transporto más cantidad de lo esperado")		
 			}
 			if (this.cantEsperada == prom) {
 				console.log("El colectivo transporto lo esperado")			
 			}
 			return false
 		}
 	}
}
paradas_146 = [new Parada(60,150),new Parada(180,170),new Parada(265,190),
				new Parada(350,200),new Parada(436,200),new Parada(480,210),
				new Parada(520,180),new Parada(540,200),new Parada(650,210),
				new Parada(780,200),new Parada(780,170)];

paradas_152 = [new Parada(110,40),new Parada(180,25),new Parada(210,70),
				new Parada(300,100),new Parada(330,100),new Parada(420,110),
				new Parada(531,140),new Parada(570,100),new Parada(650,60),
				new Parada(710,60),new Parada(750,120)];
tiempo_146 = 0
tiempo_152 = 0

ids_146 = ["cole1_146","cole2_146","cole3_146"]
ids_sobre_146 = ["coleSobre_1","coleSobre_2","coleSobre_3"]
ids_152 = ["cole1_152","cole2_152","cole3_152"]
ids_sobre_152 = ["coleSobre_4","coleSobre_5","coleSobre_6"]

var tiempoParadas152 = [2,3,2,3,2,3,2,3,2,3]; //25
var tiempoParadas146 = [4,5,6,3,2,1,1,1,3,2]; //28 

var Linea152 = new LineaCole(10,7,3);
var Linea146 = new LineaCole(12,7,3);

Linea146.addParadas(paradas_146)
Linea152.addParadas(paradas_152)

Linea146.addIdsColectivos(ids_146)
Linea152.addIdsColectivos(ids_152)
Linea146.addIdsSobreColectivos(ids_sobre_146)
Linea152.addIdsSobreColectivos(ids_sobre_152)

Linea146.addTiempoEntreParadas(tiempoParadas146)
Linea152.addTiempoEntreParadas(tiempoParadas152)

var lineas = [Linea146,Linea152]

var tiempo = 0
main()
function main(){
	for (var i = 0; i <= lineas.length; i++) {
		if (lineas[i] != null){
			lineas[i].refresh()
		}
	}
	setTimeout(main,1000)
}
var cantidad = 0

function sumar(linea,colectivo,cantPersonas,id_buttom){
	var aux_linea = lineas[linea]
	var aux_colectivos = aux_linea.getColectivos()
	var aux_colectivo = aux_colectivos[colectivo]
	if (aux_colectivo != null){
		aux_colectivo.sumarPersona(cantPersonas)
		cantidad = aux_colectivo.getCantPersonas()
		var aux_escrib = document.getElementById(id_buttom.toString());  
    	aux_escrib.textContent = aux_colectivo.getCantPersonas().toString();
	}
}
function restar(linea,colectivo,cantPersonas,id_buttom){
	var aux_linea = lineas[linea]
	var aux_colectivos = aux_linea.getColectivos()
	var aux_colectivo = aux_colectivos[colectivo]
	if (aux_colectivo != null){
		aux_colectivo.restarPersona(cantPersonas)
		cantidad = aux_colectivo.getCantPersonas()
		var aux_escrib = document.getElementById(id_buttom.toString());  
    	aux_escrib.textContent = aux_colectivo.getCantPersonas().toString();
	}
}