/*
if arr is odd length, fold arr by adding last number to first, etc leaving middle num the same
if arr is even length, fold the same way - no middle num
input array is not modified
[1, 2, 3, 4, 5] => [1+5, 2+4, 3] => [6, 6, 3]
[6, 6, 3] => [6+3, 6] => [9, 6]
[9, 6] => [9+6] => [15]
[15] => [15]

for loop from runs to 0
	length = arr length
	slice := make([]int, length / 2)
	for loop - start, end := 0, length - 1; start == slice.length
		slice += (arr[start] + arr[end])
		start++
		end--
*/

// package kata
package main

import "fmt"

func FoldArray(arr []int, runs int) (result []int) {
	copy := arr
	for ; runs > 0; runs-- {
		var slice []int
		length := len(copy)
		if length%2 == 0 {
			slice = make([]int, length/2)
		} else {
			slice = make([]int, length/2+1)
		}

		for i, j := 0, length-1; i < len(slice); i, j = i+1, j-1 {
			if i == j {
				slice[i] = copy[i]
				break
			} else {
				slice[i] = copy[i] + copy[j]
			}
		}
		copy = slice
	}
	result = copy
	return
}

func main() {
	fmt.Println(FoldArray([]int{1, 2, 3, 4, 5}, 2))
	fmt.Println(FoldArray([]int{6, 4, 3, 5}, 1))
}
