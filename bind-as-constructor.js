// bind 绑定的函数作为构造函数时：new 优先级更高，this 不会指向 bind 的对象

const bar = { name: 'bar 对象' };

function Foo(text) {
  console.log('Foo 内 this === bar ?', this === bar);
  console.log('Foo 内 this:', this);
  this.foo = 'foo';
  this.text = text;
}

Foo.prototype.say = function () {
  return `来自原型: ${this.text}`;
};

console.log('【1】普通 bind 调用（无 new）→ this 指向 bar');
const bound = Foo.bind(bar, 'bind 预设参数');
bound();

console.log('\n【2】bind 后再 new → this 指向新实例，忽略 bar');
const NewFoo = Foo.bind(bar, 'bind 预设参数');
const obj = new NewFoo();

console.log('\n【3】结果对比');
console.log('obj:', obj);
console.log('obj === bar ?', obj === bar);
console.log('obj instanceof Foo ?', obj instanceof Foo);
console.log('obj.__proto__ === Foo.prototype ?', obj.__proto__ === Foo.prototype);
console.log('obj.say():', obj.say());

console.log('\n【结论】作为构造函数时，this 是新实例（原型链连到 Foo.prototype），不是 bind 绑定的 bar');
