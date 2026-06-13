console.log(1);

//setTimeout1 
setTimeout(() => console.log(2));
//  promise1
Promise.resolve().then(() => console.log(3));
//  promise2 / setimeout3
Promise.resolve().then(() => setTimeout(() => console.log(4)));
//  promise3
Promise.resolve().then(() => console.log(5));
// setTimeout2
setTimeout(() => console.log(6));

console.log(7);


// 同步代码：console.log(1)  console.log(7) -> clear 

// 宏任务队列：setTimeout1 settimeout2 ，settimeout3

// 微任务队列：，Promise1 Promise 2  Promise 3 -> clear

// 输出 1，7，3，5，2，6，4

// 对于这道题 ，整片script视为宏任务， 先遇到console.log(1)，直接输出1 
// 遇到settimout1 ,加入宏任务 队列 ，遇到Promise1 ，加入微任务队列
// 遇到Promise 2 加入微任务队列
// 遇到 Promise 3 加入微任务队列
// 遇到 settimeout 2 加入宏任务队列
// 遇到 console.log(7) 直接输出7 

// 此阶段

// 此时宏任务队列：setTimeout1 settimeout2
// 此时微任务队列：，Promise1 Promise 2  Promise 3

// 此时需要清空微任务队列

// 执行 promise1， 输出3 
// 执行promise2 ，里面有settimeout3 ，加入宏任务队列 
// 执行promise 3 ，输出5 


// 现在开始清空宏任务队列。

// 执行settimout1  输出2 
// 执行settimout2 输出6 
// 执行settimout3 输出4


// 最后输出// 输出 1，7，3，5，2，6，4