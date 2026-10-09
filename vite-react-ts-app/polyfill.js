// Array.prototype.customMap = function(callback,thisArg) {
//     const result = [];
//     for(let i= 0;i< this.length; i++) {
//         result.push(callback.call(thisArg, this[i], i, this));
//     }
//     return result;
// }

// const arr = [1, 2, 3, 4, 5];
// const result = arr.customMap((num) => num * 2);  // [2, 4, 6, 8, 10]


// Function.prototype.call = function(thisArg, ...args) {
//     if (typeof this !== 'function') {
//         throw new TypeError('Call must be called on a function');
//     }
//     thisArg = thisArg || globalThis;
    
//     const uniqueKey = Symbol('fn');
//     thisArg[uniqueKey] = this;
//     const result = thisArg[uniqueKey](...args);
    
//     delete thisArg[uniqueKey];
    
//     return result;
// }

// Function.prototype.apply = function(thisArg, ...args) {
//     if (typeof this !== 'function') {
//         throw new TypeError('Call must be called on a function');
//     }
//     thisArg = thisArg || globalThis;
    
//     const uniqueKey = Symbol('fn');
//     thisArg[uniqueKey] = this;
//     const result = thisArg[uniqueKey](args);
    
//     delete thisArg[uniqueKey];
    
//     return result;
// }

Function.prototype.myBind = function(context, ...boundArgs) {
  // Edge Case: Ensure the caller is a function
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  const originalFunction = this;

  // Edge Case: Handle null/undefined and Box Primitives
  // Object(3) becomes [Number: 3], Object("a") becomes [String: "a"]
  const safeContext = (context === null || context === undefined) ? globalThis : Object(context);

  function boundFunction(...funcArgs) {
    // Edge Case: Was this function invoked with the 'new' keyword?
    const isConstructor = this instanceof boundFunction;
    
    // If called with 'new', use 'this' (the new instance) as context. 
    // Otherwise, use the safeContext passed to myBind.
    const finalContext = isConstructor ? this : safeContext;
    
    return originalFunction.call(finalContext, ...boundArgs, ...funcArgs);
  }

  // Preserve the prototype chain for constructor calls
  if (originalFunction.prototype) {
    boundFunction.prototype = Object.create(originalFunction.prototype);
  }

  return boundFunction;
};

const UserBind = Profile.myBind(userObject);
UserBind('Hello'); // Logs: "Hello, I am John Doe"
const newUserBindObj = new UserBind('Hi'); // Logs: "Hi, I am John Doe"



// function makeLargestSpecial(s) {
//     let count = 0;
//     let i = 0;
//     const specials = [];
    
//     // Step 1: Scan and decompose the string into top-level blocks
//     for (let j = 0; j < s.length; j++) {
//         count += (s[j] === '1') ? 1 : -1;
        
//         // When count hits 0, a distinct balanced block is found
//         if (count === 0) {
//             // Step 2: Recursively optimize the inside of this block
//             // Strip the outermost '1' (at i) and '0' (at j)
//             const innerOptimized = makeLargestSpecial(s.substring(i + 1, j));
            
//             // Re-wrap the optimized interior and store it
//             specials.push('1' + innerOptimized + '0');
            
//             // Move pointer to the start of the next block
//             i = j + 1;
//         }
//     }
    
//     // Step 3: Sort peer blocks descending to maximize lexicographical value
//     specials.sort((a, b) => b.localeCompare(a));
    
//     // Step 4: Combine the sorted blocks back into a single string
//     return specials.join('');
// }

// // Example usage:
// console.log(makeLargestSpecial("11011000")); // Output: "11100100"


function makeLargestSpecial(S) {
  // Base case: if string is empty, return it
  if (S.length === 0) return S;

  let count = 0;
  let start = 0;
  let specials = [];

  // Step 1: Split into special substrings
  for (let i = 0; i < S.length; i++) {
    if (S[i] === '1') count++;
    else count--;

    // When balanced, we found a special substring
    if (count === 0) {
      // Recursively process inside substring (excluding outer 1 and 0)
      let inner = makeLargestSpecial(S.substring(start + 1, i));
      specials.push("1" + inner + "0");
      start = i + 1;
    }
  }

  // Step 2: Sort substrings in descending order
  specials.sort((a, b) => b.localeCompare(a));

  // Step 3: Concatenate
  return specials.join('');
}

// Example:
console.log(makeLargestSpecial("11011000")); // "11100100"

