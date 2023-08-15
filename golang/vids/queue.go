/*
queue - FIFO first in first out
standing in line - dequeue the first ones in line
*/

package main
import "fmt"

// queue struct - slice
type Queue struct {
	items []int
}

// enqueue
func (q *Queue) Enqueue(i int) {
	q.items = append(q.items, i)
}

// dequeue
func (q *Queue) Dequeue() (removed int) {
	q.items = q.items[1:]
	return
}


func main() {
	myQ := Queue{}
	fmt.Println(myQ)
	myQ.Enqueue(100)
	myQ.Enqueue(200)
	myQ.Enqueue(300)
	fmt.Println(myQ)
	myQ.Dequeue()
	fmt.Println(myQ)
	myQ.Dequeue()
	fmt.Println(myQ)
}