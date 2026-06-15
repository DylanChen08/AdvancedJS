function curry(fn) {
  debugger;

  return function curried(...args) {
    debugger;

    if (args.length >= fn.length) {
      debugger;

      return fn(...args);
    }

    return function (...nextArgs) {
      debugger;

      return curried(...args, ...nextArgs);
    };
  };
}

function add(a, b, c) {
  debugger;

  return a + b + c;
}

const curryAdd = curry(add);

console.log("curryAdd(1)(2)(3) =", curryAdd(1)(2)(3));
// console.log("curryAdd(1, 2)(3) =", curryAdd(1, 2)(3));
// console.log("curryAdd(1)(2, 3) =", curryAdd(1)(2, 3));
// console.log("curryAdd(1, 2, 3) =", curryAdd(1, 2, 3));
