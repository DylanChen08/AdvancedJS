function cal(n) {
  let sum = 0;
  let i = 1;
  let j = 1;

  for (; i < n; ++i) {
    j = 1;
    for (; j < n; ++j) {
      sum += i * j;
    }
  }

  return sum;
}

console.log("cal(5) =", cal(5));
console.log("cal(10) =", cal(10));

