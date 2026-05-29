// 题目1 
// console.log(1);  //同步任务

setTimeout(() => {
    console.log(2); //宏任务
}, 0);

Promise.resolve().then(() => {
    console.log(3); //微任务
});

console.log(4);



// 1.先执行当前宏任务里米纳的同步代码
// 2.遇到宏任务放宏队列，遇到微任务放微队列。
// 3. 当宏任务结束后，先清空所有微任务，再取下一个宏任务。
// 4. 重复以上步骤，直到所有任务执行完毕。



//题目 2

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


// “此时同步任务队列为空” 改为 当前 script 宏任务里没有可立即输出的同步语句更佳。



// 题目3

async function fn() {

    console.log(1);

    await Promise.resolve();

    console.log(2);

}

console.log(3);

fn();

console.log(4);


//同步任务 ：3，1，
// 微队列： await 
// 宏队列：


// 对于这个题目，script 整体片段的同步任务首先检测到console.log(3) 输出3 
// 然后就是检测到执行fn
//  我们到fn里面看看  里面有同步代码console.log(1)  马上输出1 
//  然后遇到微任务await ，所以微任务队列有 await promise.resolve()
//  我不太清楚 是不是微任务会阻碍同步的执行？  答案：  await 不会阻碍外层 script 的同步代码继续执行。 它只会让 当前 async 函数 fn 暂停，把 await 后面的代码包装成微任务放入微任务队列了。
//   然后函数现在pending了，我们继续读console.log(4)  输出4 
//   然后这个时候 同步代码已经跑完了， 准备清空所有微任务， await 输出 resolve 
// 接着读取console.log(2)
//  所以最终输出 3,1,4,2



// 题目4 : 中级陷阱

// await陷阱 ：await 函数后面是会直接执行的，不会放到微队列
async function fn() {

    console.log(1);

    await fn2();

    console.log(2);

}

async function fn2() {

    console.log(3);

}

console.log(4);

setTimeout(() => {
    console.log(5);
});

fn();

Promise.resolve().then(() => {
    console.log(6);
});

console.log(7);





// 同步任务:  4,1 ,7 (done)
// 微队列：await fn2  console.log(2), promise => console.log(6)
// 宏队列: settimeout,


// 4,1,7,3,2,6


// 对于这个题目，整体script分析，同步任务有 4 ，然后遇到settimeout 加入宏队列，然后读取到fn() 输出1
//  然后遇到async fn2 加入微队列，然后 await fn2 后面的 console.log（2） 也加入微队列

// 然后遇到了 Promise resolve 6  加入微队列

// 此时微队列  await fn2  console.log(2), promise => console.log(6)
// 此时宏队列：settimeout

// 然后继续跑 遇到同步任务 console.log(7)

// 在此 输出4,1,7
// 然后准备清空微队列 ，分别输出3,2,6 
// 实际输4,1,7,3,2,6


// 修改后:

// 同步任务: 4 ,1
// 微队列： console.log(2) ,promise = > console.log(6)
// 宏队列:  settimeout => console.log(5);

// output: 4,1,3,7,2,6,5




// 题目5:腾讯中级 

console.log(1);
// setimeout1
setTimeout(() => {

    console.log(2);
     //promise 1
    Promise.resolve().then(() => {
        console.log(3);
    });

}, 0);
//promise 2
Promise.resolve().then(() => {

    console.log(4);
    // setimeout2
    setTimeout(() => {
        console.log(5);
    }, 0);

});

console.log(6);


// 同步任务 ： 1， 6 -
// 微队列: promise2-done ,promise1-done
// 宏队列 setimeout1-done settimeout2-done
// output: 1,6,4,3,2,5


// 先看整体script， 先打印1，然后遇到settimeout1 加入宏队列，然后继续遇到promise1 ，加入微队列，然后遇到console.log(6)直接打印了6
// 然后此时微队列有： promise1， 此时宏队列有 settimeout1 
// 我们清空微队列，先清楚promise1 ，里面有遇到console.log（4） 打印4 ，遇到setimout2 加入宏队列，微队列清除完毕
// 清除宏队列 ，此时宏队列有settimeou1 settimeout 2 先看settimeout1 先输出2 然后 遇到Promise1 加入微队列 

// 此时宏队列： settimout 2  微队列promise1

// 继续清除微队列，promise1 里面输出3 微队列清除完毕。
// 此时宏队列还有settimout 2 ，执行输出5

// output：1，6，4，2，3，5
