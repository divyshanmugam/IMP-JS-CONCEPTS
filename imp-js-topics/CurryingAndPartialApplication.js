/* 
    Currying is a technique in functional programming where a 
    function with multiple arguments is transformed into a sequence 
    of functions, each taking a single argument. This allows for 
    partial application of functions, enabling more flexible and reusable code.
*/

const curriedAdd = (a) => (b) => (c) => a + b + c;

console.log(curriedAdd(1)(2)(3)); // Output: 6


//For lodgging and debugging purposes

const log = severity => timestamp => message => {
    console.log(`[${severity.toUpperCase()}] [${timestamp}] ${message}`);
}

const logInfo = log('info');
logInfo(new Date().toISOString())('This is an informational message.');

const logError = log('error');
logError(new Date().toISOString())('This is an error message.');

/* 
    Partial appliucation is functional programming technique
    where the original function's structure isnt changed instead it 
    creates new function with some arguments pre-filled.This allows 
    for creating specialized functions from more general ones. 
*/

/* 
    Both currying and partial application are powerful techniques in
    functional programming that enhance code reusability, readability, 
    and modularity. They allow developers to create more modular and 
    composable functions, making it easier to build complex applications 
    from simpler components. 
 */
