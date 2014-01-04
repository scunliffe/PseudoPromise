function PseudoPromise(){
	this.data = {};
	this.completeCount = 0;
	this.funcCount = 0;
	this.minCompleteCount = 0;
	this.complete = false;
	this.funcs = {};
	this.successHandler = null;
	this.errorHandler = null;
	this.addMethod = function(id, func){
		this.funcs[id] = {"func":func, "triggered":false, "executed":false, "wasSuccessful":null};
	};
	this.markComplete = function(id, wasSuccessful){
		this.funcs[id]["executed"] = true;
		this.funcs[id]["wasSuccessful"] = wasSuccessful;
		this.completeCount++;
		if(!wasSuccessful){
			this.setCompleted();
			this.errorHandler();
		} else {
			this.checkForCompletion();
		}
	};
	this.checkForCompletion = function(){
		if(!this.complete && (this.completeCount >= this.minCompleteCount)){
			this.setCompleted();
			this.successHandler();
		}
	};
	this.setCompleted = function(){
		this.complete = true;
	};
	this.start = function(minCompleteCount, successHandler, errorHandler){
		this.minCompleteCount = minCompleteCount;
		this.successHandler = successHandler;
		this.errorHandler = errorHandler;
		for(var x in this.funcs){
			this.funcs[x]["func"]();
			this.funcs[x]["triggered"] = true;
		}
	};
}
