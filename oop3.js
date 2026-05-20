Function.prototype.myBind = function (target, ...args) {
  const fn = this;

  return function (...restArgs) {
    return fn.call(target, ...args, ...restArgs);
  };
};

// ========== 教学测试 ==========

console.log('【测试 1】绑定 this');
const foo = { value: 1 };

function bar() {
  console.log('  → bar 内 this:', this);
  console.log('  → bar 内 this.value:', this.value);
}

const boundBar = bar.myBind(foo);
console.log('  调用 boundBar()：');
boundBar();

console.log('\n【测试 2】偏函数：先绑参数，调用时再传参');
function add(a, b) {
  const result = a + b;
  console.log(`  → add(${a}, ${b}) = ${result}`);
  return result;
}

const boundAdd = add.myBind(null, 10);
console.log('  boundAdd = add.myBind(null, 10)  // 预设第一个参数为 10');
console.log('  调用 boundAdd(5)：');
const sum = boundAdd(5);
console.log('  返回值:', sum);

console.log('\n【测试 3】与原生 bind 对比');
function greet(name) {
  return `Hi, ${name}, from ${this.team}`;
}

const ctx = { team: 'JS 班' };
const myGreet = greet.myBind(ctx, 'Tom');
const nativeGreet = greet.bind(ctx, 'Tom');

console.log('  myBind 结果:', myGreet());
console.log('  原生 bind 结果:', nativeGreet());
console.log('  两者相等?', myGreet() === nativeGreet());
