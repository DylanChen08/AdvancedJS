/**
 * 236. 二叉树的最近公共祖先
 *
 * 解题思路：
 * 对整棵树做一次后序 DFS。
 * 1. 如果 root 是 null，说明当前子树没有找到 p 或 q，返回 null。
 * 2. 如果 root 等于 p 或 q，说明当前节点就是目标节点之一，直接返回 root。
 * 3. 分别去左子树和右子树查找 p、q。
 * 4. 如果左右子树都返回了非 null，说明 p、q 分别在 root 两侧，root 就是最近公共祖先。
 * 5. 如果只有一边返回非 null，说明 p、q 都在这一边，继续把这一边的结果向上返回。
 *
 * 时间复杂度：O(n)
 * n 是二叉树节点数。最坏情况下每个节点只会被访问一次。
 *
 * 空间复杂度：O(h)
 * h 是二叉树高度，来自递归调用栈。
 * 最坏情况下树退化成链表，空间复杂度是 O(n)；
 * 平衡二叉树时，空间复杂度是 O(log n)。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *   this.val = val;
 *   this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // 递归终止条件：
  // 1. 如果 root 是 null，说明当前子树没有找到 p 或 q，返回 null。
  // 2. 如果 root 等于 p 或 q，说明当前节点就是目标节点之一，直接返回 root。
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left !== null && right !== null) {
    return root;
  }

  return left !== null ? left : right;
};

// 本地简单测试：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1，答案是 3。
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

const root = new TreeNode(3);
const node5 = new TreeNode(5);
const node1 = new TreeNode(1);
const node6 = new TreeNode(6);
const node2 = new TreeNode(2);
const node0 = new TreeNode(0);
const node8 = new TreeNode(8);
const node7 = new TreeNode(7);
const node4 = new TreeNode(4);

root.left = node5;
root.right = node1;
node5.left = node6;
node5.right = node2;
node1.left = node0;
node1.right = node8;
node2.left = node7;
node2.right = node4;

console.log(lowestCommonAncestor(root, node5, node1).val); // 3
console.log(lowestCommonAncestor(root, node5, node4).val); // 5
