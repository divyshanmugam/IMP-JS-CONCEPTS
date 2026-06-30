/*
    Memoization is a optimization technique used primarily to speed up computer 
    programs by storing the results of expensive function calls and returning 
    the cached result when the same inputs occur again.
*/

function square(n) {
    console.log('Calculating square of ' + n);
    return n * n;
}

function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            console.log('Fetching from cache for ' + key);
            return cache[key];
        }
        console.log('Calculating result for ' + key);
        const result = fn(...args);
        cache[key] = result;
        return result;
    }
}

const memoizedSquare = memoize(square);

console.log(memoizedSquare(5695382986952965556885568745,45864525848954,87456218745874));
console.log(memoizedSquare(5695382986952965556885568745,45864525848954,87456218745874)); // This will fetch from cache