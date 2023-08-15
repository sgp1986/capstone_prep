/*
tree - structure of nodes with nodes pointing to children nodes
top node is root
nudes under nodes are children
nodes above are parents
nodes with no children are leaves
if nodes only have two children is binary tree
each parent has a left and right child
smaller child on left, larger on right
nodes are inserted as leaf
if new node is larger than current node, go to right child
if smaller, go to left node
if it reaches end, add there
search operates similarly
searching binary trees are very fast - O(H) faster than O(N)
*/

package main
import "fmt"

// Node
type Node struct {
	Key int
	Left *Node
	Right *Node
}

// Insert
func (n *Node) Insert(k int) {
	if n.Key < k {
		// move right
		if n.Right == nil {
			n.Right = &Node{Key: k}
		} else {
			n.Right.Insert(k)
		}
	} else if n.Key > k {
		// move left
		if n.Left == nil {
			n.Left = &Node{Key: k}
		} else {
			n.Left.Insert(k)
		}
	}
}

// Search
func (n *Node) Search(k int) bool {
	if n == nil {
		return false
	}
	if n.Key < k {
		// move right
		return n.Right.Search(k)
	} else if n.Key > k {
		// move left
		return n.Left.Search(k)
	}

	return true
}



func main() {
	tree := &Node{ Key: 100 }
	tree.Insert(52)
	tree.Insert(203)
	tree.Insert(19)
	tree.Insert(76)
	tree.Insert(150)
	tree.Insert(310)
	tree.Insert(7)
	tree.Insert(24)
	tree.Insert(88)
	tree.Insert(276)
	fmt.Println(tree.Search(76))
	fmt.Println(tree.Search(400))
}