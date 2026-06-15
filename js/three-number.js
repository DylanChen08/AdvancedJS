var threeSumClosest = function (nums, target) {
    nums.sort((a, b) => a - b);
  
    let best = nums[0] + nums[1] + nums[2];
  
    for (let i = 0; i < nums.length - 2; i++) {
      let left = i + 1;
      let right = nums.length - 1;
  
      while (left < right) {
        let sum = nums[i] + nums[left] + nums[right];
        // 情况1.1 - 更新结果
        if (Math.abs(sum - target) < Math.abs(best - target)) {
          best = sum;
        }
        
        // 情况2.1 - 移动指针，改变搜查方向
        if (sum < target) left++;
        else if (sum > target) right--;
        else return sum;
      }
    }
  
    return best;
  };