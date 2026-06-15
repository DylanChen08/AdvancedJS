function compose(...fns) {
  return function (value) {
    return fns.reduceRight(function (result, fn) {
      return fn(result);
    }, value);
  };
}

function addOne(num) {
  return num + 1;
}

function double(num) {
  return num * 2;
}

function square(num) {
  return num * num;
}

const calculate = compose(addOne, double, square);

console.log("compose(addOne, double, square)(3) =", calculate(3));
console.log("执行顺序: square(3) -> double(9) -> addOne(18) -> 19");

