/*
You are given three piles of casino chips: white, green and black chips:

the first pile contains only white chips
the second pile contains only green chips
the third pile contains only black chips
Each day you take exactly two chips of different colors and head to the casino. You can choose any color, but you are not allowed to take two chips of the same color in a day.

You will be given an array representing the number of chips of each color and your task is to return the maximum number of days you can pick the chips. Each day you need to take exactly two chips.

prob
create function Solve
takes one argument

	array of 3 ints - 3 stacks of different color chips

returns

	int - the number of times a chip can be removed from two stacks

rules

	only one chip from two stacks each time

solution

	create count var
	while at least 2 ints are 1 or more
		iterate through arr els (for loop)
			create times var
			if el > 0 (if el)
				el - 1
				times + 1
			if times == 2
				do not move on to next el
				count + 1
	return count
*/
package main

import (
	"fmt"
	"sort"
)

func Solve(arr []int) (count int) {
	for canTakeTwoChips(arr) {
		sort.Ints(arr)

		var times int
		for i := len(arr) - 1; i >= 0; i-- {
			if arr[i] > 0 {
				arr[i] -= 1
				times += 1
			}
			if times == 2 {
				count += 1
				break
			}
		}
	}

	return
}

func canTakeTwoChips(arr []int) bool {
	return (arr[0] > 0 && arr[1] > 0 ||
		arr[0] > 0 && arr[2] > 0 ||
		arr[1] > 0 && arr[2] > 0)
}

func main() {
	fmt.Println(Solve([]int{1, 1, 1}))    // 1
	fmt.Println(Solve([]int{1, 2, 1}))    // 2
	fmt.Println(Solve([]int{4, 1, 1}))    // 2
	fmt.Println(Solve([]int{8, 2, 8}))    // 9
	fmt.Println(Solve([]int{8, 1, 4}))    // 5
	fmt.Println(Solve([]int{7, 4, 10}))   // 10
	fmt.Println(Solve([]int{12, 12, 12})) // 18
	fmt.Println(Solve([]int{1, 23, 2}))   // 3
}
