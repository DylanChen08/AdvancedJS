/**
 * 3. 无重复字符的最长子串
 *
 * 时间复杂度优先：O(n)
 * - right 从左到右只遍历一遍字符串
 * - left 遇到窗口内重复字符时，直接跳到重复字符后一位
 * - Map 记录每个字符最后出现的位置，has/get/set 平均 O(1)
 *
 * 空间复杂度：O(min(n, 字符集大小))
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let left = 0
    let result = 0
    const last = new Map()

    for (let right = 0; right < s.length; right++) {
        const char = s[right]

        // char 在当前窗口 [left, right] 内重复，left 直接跳过上一次 char 的位置
        if (last.has(char) && last.get(char) >= left) {
            left = last.get(char) + 1
        }

        last.set(char, right)

        const windowLength = right - left + 1
        result = Math.max(result, windowLength)
    }

    return result
}

const testCases = [
    ["abcabcbb", 3],
    ["bbbbb", 1],
    ["pwwkew", 3],
    ["abba", 2],
    ["tmmzuxt", 5],
    ["", 0],
]

for (const [s, expected] of testCases) {
    const actual = lengthOfLongestSubstring(s)
    console.log(
        `s="${s}" => ${actual}，期望：${expected}，${actual === expected ? "通过" : "失败"}`
    )
}
