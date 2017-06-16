const DOMINIO = window.location.protocol + '//' + window.location.host;

var COMPONENTES = (function(){
	function COMPONENTES(){
		this._COMPONENTES = {};
	}

	COMPONENTES.prototype.define = function(elemento,Classe){
		if(document.querySelector(elemento)){
			this._COMPONENTES[elemento] = [];

			var elementoList = document.querySelectorAll(elemento);

			for(var i=0 ; i<elementoList.length ; i++){
				this._COMPONENTES[elemento].push(new Classe(elementoList[i]));
			}
		}
	}

	COMPONENTES.prototype.log = function() {
		return this;
	};

	return COMPONENTES;
})();

var elementosCustom = new COMPONENTES();