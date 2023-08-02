package main

import "fmt"

// arrays
// func main() {
// 	scores := [4]int{9001, 9333, 212, 33}
// 	for index, value := range scores {
// 		fmt.Println(index, value)
// 	}
// }

// slices
func main() {
	// scores := []int{1, 4, 293, 4, 9}
	// for index, value := range scores {
	// 	fmt.Println(index, value)
	// }
	// makes slice with length 10, capacity 10
	// 	scores := make([]int, 10)
	// 	fmt.Println(scores)
	// makes a slice with length 0, capacity 10
	scores := make([]int, 0, 10)
	fmt.Println(scores)
}
