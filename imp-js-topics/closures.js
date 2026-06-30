/* 
    Closure is nothing but a combination of function bundled together with 
    the references to its surrounding state (the lexical environment). 
    In other words, a closure gives you access to an outer function’s scope 
    from an inner function. In JavaScript, closures are created every time 
    a function is created, at function creation time. 
*/

function parent(x) {
    return function child(y) {
        return x * y;
    };
}

const closure = parent(5);
// console.log(closure(2));


function makeCounterWithVar() {
    for(var i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
}
//console.log(makeCounterWithVar());

function makeCounterWithLet() {
    for(let i = 0; i < 5; i++) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    }
}
// console.log(makeCounterWithLet());


