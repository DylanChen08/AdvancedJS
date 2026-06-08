// ========== JavaScript 垃圾回收演示（node --expose-gc gc-demo.js）==========
//
// 重点：
// 1. JavaScript 引擎按“可达性”判断对象是否还需要保留。
// 2. 对象不再能从全局变量、当前调用栈、闭包等地方访问时，才“可能”被回收。
// 3. 垃圾回收由引擎决定时机，不能依赖它立刻执行。

function formatMB(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function printMemory(label) {
  const memory = process.memoryUsage();
  console.log(label);
  console.log('  heapUsed:', formatMB(memory.heapUsed));
  console.log('  heapTotal:', formatMB(memory.heapTotal));
  console.log('');
}

function runGC() {
  if (typeof global.gc !== 'function') {
    console.log('  当前没有开启手动 GC。');
    console.log('  请用：node --expose-gc gc-demo.js\n');
    return;
  }

  global.gc();
}

console.log('【一】强引用：变量还能访问对象，对象就不会被当成垃圾\n');

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

console.log('  users[0].name =', users[0].name);
console.log('  users 变量仍然指向数组，所以数组和里面的对象都是可达的。\n');

console.log('【二】解除引用：让对象变成不可达，之后才可能被回收\n');

printMemory('  创建大数组前：');

let bigList = Array.from({ length: 500000 }, (_, index) => ({
  index,
  value: `item-${index}`,
}));

printMemory('  创建大数组后：');

bigList = null;
console.log('  bigList = null 后，大数组不再能通过 bigList 访问。');
console.log('  它现在只是“可以被回收”，不是“已经被回收”。\n');

runGC();
printMemory('  尝试触发 GC 后：');

console.log('【三】闭包也会保留引用：函数还在，对象也可能还在\n');

function createCacheReader() {
  const cache = Array.from({ length: 100000 }, (_, index) => `cache-${index}`);

  return function readCache(index) {
    return cache[index];
  };
}

let readCache = createCacheReader();
console.log('  readCache(10) =', readCache(10));
console.log('  cache 是 createCacheReader 的局部变量，但被返回的函数闭包引用着。');
console.log('  只要 readCache 还在，cache 就仍然可达。\n');

readCache = null;
console.log('  readCache = null 后，闭包和它引用的 cache 才可能被回收。\n');

runGC();
printMemory('  再次尝试触发 GC 后：');

console.log('【四】WeakMap：弱引用不会阻止 key 被回收\n');

const normalMap = new Map();
const weakMap = new WeakMap();
let user = { id: 3, name: 'Cindy' };

normalMap.set(user, '普通 Map 会强引用 key');
weakMap.set(user, 'WeakMap 不会强引用 key');

console.log('  normalMap.has(user) =', normalMap.has(user));
console.log('  weakMap.has(user) =', weakMap.has(user));

user = null;
console.log('  user = null 后：');
console.log('  - normalMap 里仍然保存着原对象作为 key，所以对象还可达。');
console.log('  - WeakMap 不会因为 key 存在而阻止对象回收。');
console.log('  如果想让普通 Map 里的对象也能回收，需要 normalMap.clear() 或 delete 对应 key。\n');

normalMap.clear();
runGC();

console.log('【五】FinalizationRegistry：观察回收，但不要依赖它写业务逻辑\n');

const registry = new FinalizationRegistry((name) => {
  console.log(`  FinalizationRegistry 回调：${name} 可能已经被回收`);
});

(function createTemporaryObject() {
  const temporary = { name: 'temporary object' };
  registry.register(temporary, temporary.name);
})();

console.log('  临时对象离开函数作用域后已经不可达。');
console.log('  即使手动触发 GC，FinalizationRegistry 回调也不保证马上执行。\n');

runGC();

setTimeout(() => {
  console.log('【总结】');
  console.log('  垃圾回收看的是对象是否“可达”。');
  console.log('  变量、对象属性、数组、Map、闭包都可能让对象继续可达。');
  console.log('  WeakMap / WeakSet 适合存放不想阻止对象回收的关联数据。');
}, 0);
