/*
stacks LIFO - last in first out
stack of books - remove the newest book on top/end
*/

package main
import "fmt"

// Stack - slice holding the values in the stack
type Stack struct {
items []int
}

// push
func (s *Stack) Push(i int) {
	s.items = append(s.items, i)
}

// pop
func (s *Stack) Pop() (removed int) {
	s.items = s.items [:len(s.items)-1]
	return
}

func main() {
	myStack := Stack{}
	fmt.Println(myStack)
	myStack.Push(100)
	myStack.Push(200)
	myStack.Push(300)
	fmt.Println(myStack)
	myStack.Pop()
	fmt.Println(myStack)
	myStack.Pop()
	fmt.Println(myStack)
}