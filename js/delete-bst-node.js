/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {

    if (!root) {
        return null
    }

    // 去左子树找
    if (key < root.val) {
        root.left = deleteNode(root.left, key)
    }
    // 去右子树找
    else if (key > root.val) {
        root.right = deleteNode(root.right, key)
    }
    // 找到了
    else {

        // 没有左孩子
        if (!root.left) {
            return root.right
        }

        // 沒有右孩子
        if (!root.right) {
            return root.left
        }

        // 左右孩子都存在
        let minNode = root.right

        // 找右子树最小节点
        while (minNode.left) {
            minNode = minNode.left
        }

        // 用后继节点覆盖当前节点
        root.val = minNode.val

        // 删除原来的后继节点
        root.right = deleteNode(
            root.right,
            minNode.val
        )
    }

    return root
};