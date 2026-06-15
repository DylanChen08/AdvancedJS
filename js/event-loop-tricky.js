console.log('stack [1]');
// settimout1
setTimeout(() => console.log("macro [2]"), 0);
// settimout2
setTimeout(() => console.log("macro [3]"), 1);

// promise1
const p = Promise.resolve();
// p.then1
for (let i = 0; i < 3; i++) p.then(() => {
    // settimeout3
    setTimeout(() => {
        console.log('stack [4]');
        // settimeout4
        setTimeout(() => console.log("macro [5]"), 0);
        // p.then2
        p.then(() => console.log('micro [6]'));
    }, 0);
    console.log("stack [7]");
});

console.log("macro [8]");


// 同步任务： stack [1] macro [8]

// 宏队列： settimeout1->clear settimeout2->clear  settimout3->clear settimout3->clear  settimout3-> clear 
        //    seettimeout4-clear settimeout4-clear settimeout4

// 微队列： p.then1->clear  p.then1->clear p.then1->clear   p.then2->clear p.then2->clear p.then2-> clear



/*

对于这道题整片scipt 作为一个宏任务，执行。
首先遇到 console.log('stack [1]'); 
直接输出stack [1]
遇见settimeout1 加入宏队列，遇到settimeout2 加入宏队列

再接下来 遇到for循环  p.then 被加入三次微队列

然后遇到了console.log("macro [8]"); 输出macro [8]


清空微队列：第一个p.then,里面遇到settimout3 ，加入宏队列
然后遇到console.log("stack [7]"); 输出 stack [7]

再跑第二个微队列，p.then
同样把settimeout3 加入宏任务，再次遇到console.log("stack [7]");
输出stack [7]

再跑第三个微队列， p.then
同样把settimeout3 加入宏任务，再次遇到console.log("stack [7]");
输出stack [7]


微队列已经空了，开始执行宏队列
执行setimout1 
输出macro [2]
然后立即检查微任务队列 没有，所以继续宏任务，所以 执行settimout2，
输出macro [3]，
检查微任务队列还是没有，继续执行settimout3，
输出同步console.log('stack [4]');
遇到settimeout4，加入宏队列 ，遇到p.then2，加入微队列。再次检查微队列，执行p.then2 
输出micro [6] ，微队列空了 继续执行宏队列第二个settimeou3，
继续输出输出同步console.log('stack [4]');
遇到settimeout4，加入宏队列 ，遇到p.then2，加入微队列。继续看微队列， 执行p.then2，
输出micro [6]。微队列空了，继续执行宏队列的第三个settimout3，
输出同步console.log('stack [4]');
遇到settimeout4，加入宏队列 ，遇到p.then2，加入微队列。继续看微队列， 执行p.then2，
输出micro [6]。微队列空了，继续执行宏队列seettimeout4，
输出macro [5]
检查微队列空的，继续执行宏任务 继续执行seettimeout4
输出macro [5]，检查微队列，是空的，继续继续执行宏任务 继续执行seettimeout4
输出macro [5]

/*
输出结果： stack [1] macro [8] stack [7] stack [7] stack [7]  macro [2] macro [3] 
stack [4] micro [6] stack [4] micro [6]  stack [4] micro [6] macro [5] macro [5] macro [5]
          
/



*/