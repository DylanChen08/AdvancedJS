var findLongestWord = function(s, dictionary) {
    let ans = "";
  
    for (const word of dictionary) {
        // j => word的指针
      let j = 0;
        // i => s的指针
      for (let i = 0; i < s.length; i++) {
        if (s[i] === word[j]) j++;
      }
  
      if (j === word.length &&
          (word.length > ans.length ||
          // 情况2 - word和ans长度相同，字典序更小 word < ans
          (word.length === ans.length && word < ans))) {
        ans = word;
      }
    }
  
    return ans;
  };
