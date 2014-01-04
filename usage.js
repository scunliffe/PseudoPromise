//Basic usage:

//initialize...
var swear = new PseudoPromise();

//add functions...
swear.addMethod('foo', doFoo);
swear.addMethod('bar', doBar);
swear.addMethod('baz', doBaz);

//start the batch of functions...
swear.start(3, mySuccessHandler, myErrorHandler);


//=============================================================

//Other Methods/Options:

//Add functions...
swear.addMethod(functionID, functionReference);


//indicate when a asynchronous function has completed (success or error)
swear.markComplete(functionID, wasSuccessful);


//start the batch of functions...
swear.start(minCompletedCount, successHandler, errorHandler);

//setting the minCompletedCount to 1 will execute the successHandler when the first (e.g. any) function completes successfully

/*
  Notes:
    - If any completed function is marked as an error the overall errorHandler is called (and further handling of
      completed functions is ignored)
    - Currently each method added requires an ID... but this might change
    - In most typical cases the desired behavior is an AND condtion where all the functions should complete
      before calling the overall success handler... however to obtain an OR condition behavior setting the
      minCompletedCount to 1 will achieve this
*/




