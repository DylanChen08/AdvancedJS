const bar = {
  bar: 'bar',
};

function Foo(text) {
  debugger;
  this.foo = 'foo';
  this.text = text;
}

Foo();

const obj = new Foo('name');

// const NewFoo = Foo.bind(bar, 'text');
// const obj = new NewFoo();

console.log(obj);

// 构造函数的 this 和普通函数的 this 指向的内容不同
 