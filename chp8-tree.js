/*
An internal node is a node with at least one child.
An external node is a node without any child; also called leaf.
A subtree is a node with its decendants.
A node's depth is the number of ancestor it has; apart from root node any node has at least depth of 1.
A tree's height is the max depth of all nodes on the tree.
A Binary Tree is a tree with each node having at most two children. This allows more efficient algorithm for searching, inserting and deleting nodes on the tree.
A Binary Search Tree (BST) is a binary tree where left child value <= right child value
*/

function BST() {
    
    // helper class to model the node on the tree.
    var Node = function(key){ 
        this.key = key; // a key is how a tree node is known in tree terminology.
        this.left = null;
        this.right = null;
    }
    
    var root = null;
    // a local helper function to enable the recursion.
    var insertNode = (rootNode, newNode) => {
        if (newNode.key <= rootNode.key) { // to insert to the left branch
            if (rootNode.left === null) // if it's the first left node
                rootNode.left = newNode;
            else 
                insertNode(rootNode.left, newNode);
        }
        else { // to insert to the right branch
            if (rootNode.right === null)
                rootNode.right = newNode;  //if it's the 1st right node 
            else 
                insertNode(rootNode.right, newNode);
        }
    }
        
    ///<summary>
    /// insert a new key to the tree.
    /// Inserting can cause the tree to become a skinny linear height tree; the height can range from 
    /// log(n) to n. Luckily on average (when considering each n! case equally likely), it's with high probability
    /// that the tree height is O(log(n)). This is the power of randomization!
    ///</summary>
    this.insert = key => {
        var node = new Node(key); //create a new node
        if (root === null){ // if it's an empty tree
            root = node;
            return;
        }
        insertNode(root, node);
    }   
    
    /// search a specific key on the tree; the final insert operation takes O(1);
    // searching where to insert takes O(h) where h is the height of the tree.
    this.search = key => {
        // a helper function to enable recursion searching
        var searchKey = function(node, key) {
            if (node === null) // no more searching to be continued
                return false;
            if (node.key === key) {
                return true;
            }
            if (node.key > key) { //left branch should be searched
                return searchKey(node.left, key);
            }
            return searchKey(node.right, key); // right branch should be searched
        }
        // call the helper function
        return searchKey(root, key);
    }
    
    /// all traverses take O(n) where n is the numebr of nodes on the trees.
    
    
    /// pre-traverse: parent - left child - right child
    //An application of pre-order traversal could be to print a structured document
    this.preTraverse = callback => {
        // a local recursion function to be called by the main function
        var helper = function(node, callback) {
            if (node) {
                callback(node.key); // visit the parent first
                helper(node.left, callback); // visit the left children
                helper(node.right, callback); // visit the right children
            }
        }
        helper(root, callback);
    }
    
    /// left child - parent - right child; visiting ascendingly hence good for sorting!
    this.inTraverse = callback => {
        
        var helper = (node, callback) => {
            if (node) {
                helper(node.left, callback); // this recursion acts like a stack; collecting all left children
                callback(node.key); // this does the visiting from the stack above and below.
                helper(node.right, callback); // this is another stack for the right children
            }
        }
        
        helper(root, callback);
    }
    
    /// left child - right child - parent
    // An application of postorder could be computing the space used by a file in a directory and its subdirectories
    this.postTraverse = callback => {
        var helper = (node, callback) => {
            if (node) {
                helper(node.left, callback);
                helper(node.right, callback);
                callback(node.key);
            }
        }
        helper(root, callback);
    }
    
    
    var minNode = function(node) {
        if (node) {
            while (node && node.left) {
                node = node.left;
            }
            return node.key;
        }
        else 
            return null;
    } 
    
    // find the min node of the tree; O(l) where l is the number of nodes on the left branch
    this.min = () => {
        return minNode(root);
    }
    
        
    // find the max node of the tree; O(r) where r is the numebr of nodes on the right branch
    this.max = () => {
        // use ief 
        return (function(rootNode) {
            if (rootNode) {
                while (rootNode && rootNode.right) {
                    rootNode = rootNode.right;
                }
                return rootNode.key;
            }
            return null;    
        })(root);
    }
    
    // remove a node from the tree.
    this.remove = key => {
        // return to the root making sure after removal parent-child relationship get updated properly!
        root = removeNode(root, key);
    }
    
    var removeNode = function(node, key) {
        if (!node)
            return null;
        
        if (key < node.key) { // the removed node is on the left branch
            node.left = removeNode(node.left, key); // this will remove the node
            return node; // this updates the pointer to the node parent
        }
        else if (node.key < key) { // the removed node is on the right branch
            node.right = removeNode(node.right, key);
            return node; // again return parent to update the relationship
        }
        else { // node is the one to be removed; 3 cases to consider
            if (!node.left && !node.right) { // case1:no children at all
                node = null; // doing the removal!!!
                return node; 
            }
            if (node.left === null) { // case2.1:only has right child
                node = node.right; // so make the right child to replace the parent node that is removed
                return node;
            } else if (node.right === null) { // case2.2: only has left child
                node = node.left; // make the left child to replace the parent node
                return node;
            }
            
            // case 3: has both children; replace the deleted node with the min node of right sub-tree
            // to main the BST definition!
            var aux = findMinNode(node.right); // find the min node from the right sub-tree of the right node
            node.key = aux.key; // this makes the found min node to replace the node i.e. indierct removing!
            node.right = removeNode(node.right, aux.key); // delete the min node as it has been moved to replace the real deleted node
            return node; // again return the parent so that the relation gets reflected after removal!
        }        
    }
    
    var findMinNode = function(node) {
        if (node) {
            while (node && node.left) {
                node = node.left;
            }
            return node;
        }
        return null;
    }   
}

(function test() {
    var bst = new BST();
    bst.insert(11);
    bst.insert(7);
    bst.insert(5);
    bst.insert(9);
    bst.insert(15);
    bst.insert(3);
    bst.insert(6);
    bst.insert(8);
    bst.insert(10);
    bst.insert(13);
    bst.insert(20);
    bst.insert(12);
    bst.insert(14);
    bst.insert(18);
    bst.insert(25);
    
    console.log('PreTraverse:')
    bst.preTraverse(console.log);
    
    console.log('InTraverse (sorting):');
    bst.inTraverse(console.log);
    
    console.log('PostTraverse:');
    bst.postTraverse(console.log);
    
    console.log('max:' + bst.max());
    console.log('min:' + bst.min());
    
    //bst.remove(25);
    //console.log('after removing 25');
    bst.inTraverse(console.log);
    bst.remove(6);
    console.log('after removing 6');
    bst.inTraverse(console.log);
    bst.remove(5);
    console.log('after removing 5');
    bst.inTraverse(console.log);
})();