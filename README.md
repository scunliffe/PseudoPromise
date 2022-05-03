PseudoPromise
=============

A JavaScript pseudo Promise library for managing multiple async functions w/o using setTimeout/setInterval.

PseudoPromise is a JavaScript class to provide a basic framework to manage multiple asynchronous function
calls. PseudoPromise does NOT provide a full Promise/A+ implementation & has no intention to ever do so!
This class was created to solve the "multiple asynchronous function management" problem in a very simple
straight forward manor without using the setTimeout() or setInterval() functions.

Why no setTimeout/setInterval? Well there's a few reasons:
 1. Some places where JavaScript is available - sadly setInterval and/or setTimeout may not be
 2. Continual polling is avoided (potential positive impact on performance)

Current Features
================

 - Queue up multiple function calls
 - Ability to "complete" after (1, 2,... N) successful function completions
 - Ability to store arbitrary data in the instance
 - Bails out on first error
