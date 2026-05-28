// console.log(1);  //同步任务

// setTimeout(() => {
//     console.log(2); //宏任务
// }, 0);

// Promise.resolve().then(() => {
//     console.log(3); //微任务
// });

// console.log(4);



// 1.先执行当前宏任务里米纳的同步代码
// 2.遇到宏任务放宏队列，遇到微任务放微队列。
// 3. 当宏任务结束后，先清空所有微任务，再取下一个宏任务。
// 4. 重复以上步骤，直到所有任务执行完毕。




Promise.resolve().then(() => {

    console.log(1);

    Promise.resolve().then(() => {
        console.log(2);
    });

});

Promise.resolve().then(() => {
    console.log(3);
});

setTimeout(() => {
    console.log(4);
}, 0);


// 同步任务：
// 微队列：    
// 宏队列： 

//1 ,3 ,2,4

// 对于这个题目，一开始的时候 整体的script 就把它看作一个宏任务 ，此时宏任务里面没有任何的同步代码 故不输出。
// 然后我们遇到Promise 先记下为 p1 ,是微任务，然后继续看
//  然后遇到另一个Promise 记下p2 ,  同样是微任务。
// 然后 遇到settimout 这是宏任务
//  所以此时同步任务队列为空
// 微队列队列按顺序为： p1 p2
// 宏任务队列顺序为: settimeout
// 先清空所有微任务，所以 p1 先出，输出1 ，这时候发现了p1 里面还有一个嵌套的Promise，记为p1.1,放到微队列队尾 此时，微队列： p2 p1.1
// p2 接着出，输出3
// 接着清空微对列，p1.1出 输出2
// 微队列空了
// 现在要去一个宏任务了，就是settimeout ,由于它是0秒延迟，所以输出4
// 最后结果是1，3，2，4