const bar = {};

function Foo(text) {
  this.foo = 'foo';
  this.text = text;
}

const NewFoo = Foo.bind(bar, 'king of the world');
const obj = new NewFoo();

console.log(obj);
