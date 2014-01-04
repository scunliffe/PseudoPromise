//basic usage

//initialize...
var swear = new PseudoPromise();

//add functions...
swear.addMethod('foo', doFoo);
swear.addMethod('bar', doBar);
swear.addMethod('baz', doBaz);

//start the batch of functions...
swear.start(3, mySuccessHandler, myErrorHandler);
