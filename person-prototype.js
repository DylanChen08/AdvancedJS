// 浏览器控制台：若单独输入 console.log(x)，下一行 « undefined » 是 console.log 的返回值（恒为 undefined），
// 不是 x 的值。要看属性值可直接输入：person1.name 或 Object.getPrototypeOf(person1).name

function Person() {}

Person.prototype.name = 'youzi';

var person1 = new Person();
var person2 = new Person();

// 继承自原型，都能读到
console.log('person1.name →', person1.name);
console.log('person2.name →', person2.name);

// 显式走原型链（推荐用 Object.getPrototypeOf，与 __proto__ 等价）
var proto = Object.getPrototypeOf(person1);
console.log('Object.getPrototypeOf(person1).name →', proto.name);
console.log('proto === Person.prototype →', proto === Person.prototype);
