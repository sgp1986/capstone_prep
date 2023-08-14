/*
The maximum sum subarray problem consists in finding the maximum sum of a contiguous subsequence in an array or list of integers:

maxSequence [-2, 1, -3, 4, -1, 2, 1, -5, 4]
-- should be 6: [4, -1, 2, 1]

Easy case is when the list is made up of only positive numbers and the maximum sum is the sum of the whole array. If the list is made up of only negative numbers, return 0 instead.

Empty list is considered to have zero greatest sum. Note that the empty list or array is also a valid sublist/subarray.

prob
	take an array and find the subarray of consecutive numbers with the highest sum
arguments
	array of ints
returns
	int - highest sum of consecutive numbers
rules
	all sub arrays must be consecutive numbers in input array
	if all numbers in array are positive, return sum of array
	if all numbers are negative, return 0
		if only one num is positive, return that num
	empty array returns 0
psuedo
	find all subarrays in array
	find the sums of all subarrays
	return the highest sum
	------
	iterate through array, saving sum of subarray in var - update if the new sum is greater than whats saved
algo
	create highestSum var set to 0
	create allPositive = true
	for loop to get starting index i = 0; i < array length
		for loop to get ending index j = i; j < array length
			if array[j] < 0 set allPostive to false
			create var set to slice from start index to ending index
			find sum of slice
			if sum > highestSum, assign highestSum to sum
		if allPositive == true break
	return highestSum
*/

package main
import "fmt"

func MaximumSubarraySum(numbers []int) (highestSum int) {

	allPositive := true

	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			tempSum := 0
			if numbers[j] < 0 {
				allPositive = false
			}

			subNumbers := make([]int, 1)
			if j - 1 == i {
				subNumbers = numbers[:j]
			} else {
				subNumbers = numbers[i:j+1]
			}

			for _, v := range subNumbers {
				tempSum += v
			}
			if tempSum > highestSum {
				highestSum = tempSum
			}
		}
		if allPositive == true {
			break
		}
	}
	return
}

func main() {
	fmt.Println(MaximumSubarraySum([]int{})) // 0
	fmt.Println(MaximumSubarraySum([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})) // 6
	fmt.Println(MaximumSubarraySum([]int{-2, -1, -3, -4, -1, -2, -1, -5, -4})) // 0
}
