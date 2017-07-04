const DOMINIO = window.location.protocol + '//' + window.location.host;

String.prototype.toCamelCase = function() {
    return this.replace(/-/g,' ').replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();        
    });
};

var COMPONENTES = (function(){
	function COMPONENTES(){
		this._COMPONENTES = {};
	}

	COMPONENTES.prototype.define = function(elemento,Classe){
		if(document.querySelector(elemento)){
			this._COMPONENTES[elemento.toCamelCase()] = [];

			var elementoList = document.querySelectorAll(elemento);

			for(var i=0 ; i<elementoList.length ; i++){
				this._COMPONENTES[elemento.toCamelCase()].push(new Classe(elementoList[i]));
			}
		}
	}

	COMPONENTES.prototype.log = function() {
		return this;
	};

	return COMPONENTES;
})();

var elementosCustom = new COMPONENTES();