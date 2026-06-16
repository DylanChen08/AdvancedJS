// var findLongestWord = function(s, dictionary) {
//     let ans = "";
  
//     for (const word of dictionary) {
//         // j => word的指针
//       let j = 0;
//         // i => s的指针
//       for (let i = 0; i < s.length; i++) {
//         if (s[i] === word[j]) j++;
//       }
  
//       if (j === word.length &&
//           (word.length > ans.length ||
//           (word.length === ans.length && word < ans))) {
//         ans = word;
//       }
//     }
  
//     return ans;
//   };


// 更好
var findLongestWord = function (s, dictionary) {
    let result = ""

    for (const word of dictionary) {

        // j 指向 word
        let j = 0

        // i 指向 s
        let i = 0

        while (j < word.length && i < s.length) {

            if (word[j] === s[i]) {
                j++
            }

            // i 始终向前走
            i++
        }

        if (
            j === word.length &&
            (
                word.length > result.length ||
                (
                    word.length === result.length &&
                    word < result
                )
            )
        ) {
            result = word
        }
    }

    return result
}