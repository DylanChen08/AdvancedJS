let foo = {
  value: 1,
};

function bar() {
  console.log(this.value);
}

Function.prototype.myCall = function (target) {
  target.fn = this;
  target.fn();
};

bar.myCall(foo);
console.log(foo);
