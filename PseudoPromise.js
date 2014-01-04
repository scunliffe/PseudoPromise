/*
	PseudoPromise is a JavaScript class to provide a basic framework to manage multiple asynchronous function
	calls. PseudoPromise does NOT provide a full Promise/A+ implementation & has no intention to ever do so!
	This class was created to solve the "multiple asynchronous function management" problem in a very simple
	straight forward manor without using the setTimeout() or setInterval() functions.

	Why no setTimeout/setInterval? Well there's a few reasons:
 		1.) Some places where JavaScript is available - sadly setInterval and/or setTimeout may not be
		2.) Continual polling is avoided (potential positive impact on performance)

	Current Features:
		- Queue up multiple function calls
		- Ability to "complete" after (1, 2,... N) successful function completions
		- Ability to store arbitrary data in the instance
		- Bails out on first error
*/


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
