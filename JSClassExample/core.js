function Core(){
	/***************
	* Public
	***************/
	this.prop = "My child wanted this.";
	this.meth = function(){
		console.log("My child called me.");
	}
	/***************
	* Private
	***************/
	var self = this;//assigning self the context, so it's always available in scope.
	function checkChild(){
		console.log("I can access my childs public properties and methods:",self['aModule'].prop);
		self['aModule'].meth();
	}
	/***************
	* Constructor
	***************/
	(function(){
		console.log("I am the constructor of 'core'");
		//iterate through modules asked to be loaded.
		for ( var i in Core.Modules){
			if (typeof(Core.Modules[i])=="function"){
				self[i] = new Core.Modules[i](self);
			}
			checkChild();
		}
	})();	
}

Core.Modules = {};

window.onload = function(){
	console.log("I am executed at the DOM ready.");
	new Core();
};