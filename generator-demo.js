// ========== Generator 演示（node generator-demo.js）==========

console.log('【一】最基础写法：function* 与 yield\n');

function* test() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = test();
console.log('  gen.next() →', gen.next());
console.log('  gen.next() →', gen.next());
console.log('  gen.next() →', gen.next());
console.log('  gen.next() →', gen.next(), '// 已无 yield，done: true\n');

// ------------------------------------------------------------------

console.log('【二】创建生成器时，函数体不会立刻执行\n');

function* lazy() {
  console.log('  → lazy 函数体才执行');
  yield 'ok';
}

const g2 = lazy();
console.log('  仅 test() / lazy()：还没有任何输出');
g2.next();
console.log('');

// ------------------------------------------------------------------

console.log('【三】next() 才会真正执行 + yield 是暂停点\n');

function* step() {
  console.log('  → 1');
  yield 100;
  console.log('  → 2');
  yield 200;
  console.log('  → 3');
}

const g3 = step();
console.log('  第 1 次 next():');
console.log('    返回', g3.next());
console.log('  第 2 次 next():');
console.log('    返回', g3.next());
console.log('  第 3 次 next():');
console.log('    返回', g3.next());
console.log('');

// ------------------------------------------------------------------

console.log('【四】整体流程：暂停 → 继续 → 再暂停 → 结束\n');

function* flow() {
  console.log('  阶段 A');
  yield 'A';
  console.log('  阶段 B');
  yield 'B';
  console.log('  阶段 C（结束）');
}

const g4 = flow();
console.log('  1)', g4.next());
console.log('  2)', g4.next());
console.log('  3)', g4.next());
console.log('');

// ------------------------------------------------------------------

console.log('【五】为什么叫生成器：一个一个产生数据\n');

function* numbers() {
  yield 1;
  yield 2;
  yield 3;
}

const g5 = numbers();
console.log('  numbers().next() → value:', g5.next().value);
console.log('  numbers().next() → value:', g5.next().value);
console.log('  numbers().next() → value:', g5.next().value);
console.log('');

// ------------------------------------------------------------------

console.log('【六】next(传参) → 成为上一次 yield 表达式的结果\n');

function* recv() {
  const a = yield 1;
  console.log('  → yield 1 的“返回值”赋给 a，a =', a);
  const b = yield 2;
  console.log('  → yield 2 的“返回值”赋给 b，b =', b);
}

const g6 = recv();
console.log('  第 1 次 next()（无参）→', g6.next());
console.log('  第 2 次 next(999)     →', g6.next(999));
console.log('  第 3 次 next("hello") →', g6.next('hello'));
console.log('');

console.log('  易混点：const a = yield 1');
console.log('    · 第一次 next()：把 1 交给外部，暂停（a 还没赋值）');
console.log('    · 第二次 next(999)：999 才是 yield 1 的结果 → a = 999\n');

// ------------------------------------------------------------------

console.log('【七】Generator ≈ 函数版状态机\n');

function* stateMachine() {
  yield '状态 1';
  yield '状态 2';
  yield '状态 3';
}

const g7 = stateMachine();
let r;
while (!(r = g7.next()).done) {
  console.log('  当前状态 value:', r.value, '| done:', r.done);
}
console.log('  结束 done:', r.done, '| value:', r.value);
console.log('');

// ------------------------------------------------------------------

console.log('【八】与 async/await 的关系（思想相近）\n');

function* genFetch() {
  const data = yield Promise.resolve({ msg: '来自 Promise' });
  return data;
}

async function asyncFetch() {
  const data = await Promise.resolve({ msg: '来自 Promise' });
  return data;
}

(async () => {
  const g8 = genFetch();
  const r1 = g8.next();
  console.log('  Generator 第 1 次 next →', r1);
  const resolved = await r1.value;
  const r2 = g8.next(resolved);
  console.log('  把 Promise 结果 next 进去 →', r2);

  const asyncResult = await asyncFetch();
  console.log('  async/await 直接得到 →', asyncResult);

  console.log('');
  console.log('  核心：async/await ≈ Generator + Promise + 自动 next()');
  console.log('  Generator = 手动挡（自己 next）');
  console.log('  async/await = 自动挡（引擎帮你推进）');
  console.log('');
  console.log('【总结】Generator = 可暂停的函数；yield = 暂停点；next() = 恢复执行');
})();
