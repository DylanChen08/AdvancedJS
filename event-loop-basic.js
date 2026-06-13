console.log(1);

queueMicrotask(() => { console.log(2); });
// promise 1
Promise.resolve().then(() => console.log(3));
// settimeout1
setTimeout(() => { console.log(4); });

// 同步任务： 1  
// 微队列：queueMicrotask promise 1
// 宏队列：settimeout1

// 对于这个题目，先执行整体的script。先遇到console.log（1）
// 函数queueMicrotask执行，加入微队列
// 遇到promise 1 加入微队列
// 遇到settimeout1 加入宏队列。
// 此时 微队列有 queueMicrotask promise1  宏队列有settimeout1 
// 此时清空微队列，输出 2，3  微队列清空
// 在清空宏队列， 输出4 宏队列清空

// 最终结果1，2，3，4


// 易错点： queueMicrotask 是 window api