// const used = {
//   text: 'hello',
// };

// function say(word) {
//   word.text = 'foo';
// }

// say(used);

// console.log(used);

// let foo = {
//   value: 1,
// };

// function bar() {
//   console.log(this.value);
// }

// // bar.call(foo);


// // bar.bind(foo)();
// console.log(bar.bind(foo));

function bar() {
  console.log('this →', this);
  console.log('this.value →', this.value);
}

const foo = {
  value: 1,
  bar,
};

console.log('--- 1. 普通调用 bar() ---');
bar();

console.log('--- 2. 隐式绑定 foo.bar() ---');
foo.bar();

console.log('--- 3. 显式绑定 bar.call(foo) ---');
bar.call(foo);