// case1 — 在 checkscope 内部立刻执行 f，返回 "local scope"
var scope = "global scope";

function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }

  return f();
}

checkscope();

// case 2 — 返回函数 f，在外部再调用；闭包仍绑定创建时的环境，返回 "local scope"
var scope = "global scope";

function checkscope() {
  var scope = "local scope";

  function f() {
    return scope;
  }

  return f;
}

checkscope()();
