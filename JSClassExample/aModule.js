Core.Modules["aModule"] = function(parent){
	/***************
	* Public
	***************/
	this.parent = parent;//assiging a reference to Core so it can be found.
	this.prop = "My parent wanted this.";
	this.meth = function(){
		console.log("My parent called me.");
	}
	/***************
	* Private
	***************/
	var self = this;//assigning self the context, so it's always available in scope.
	function checkParent(){
		console.log("I can access my parents public properties and methods:",self.parent.prop);
		self.parent.meth();
	}
	/***************
	* Constructor
	***************/
	(function(){
		console.log("I am the constructor of 'aModule'");
		checkParent();
	})();
}