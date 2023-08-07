/*
If we were to set up a Tic-Tac-Toe game, we would want to know whether the board's current state is solved, wouldn't we? Our goal is to create a function that will check that for us!

Assume that the board comes in the form of a 3x3 array, where the value is 0 if a spot is empty, 1 if it is an "X", or 2 if it is an "O", like so:

[[0, 0, 1],
 [0, 1, 2],
 [2, 1, 0]]
We want our function to return:

-1 if the board is not yet finished AND no one has won yet (there are empty spots),
1 if "X" won,
2 if "O" won,
0 if it's a cat's game (i.e. a draw).
You may assume that the board passed in is valid in the context of a game of Tic-Tac-Toe.
----------------------------
problem
create function isSolved
takes one argument
	array of 3 arrays - tic tac toe game board
returns
	int - describing board status
	-1 = board not finished and no one has won
	0  = draw
	1  = x won
	2  = o won
examine board and return one of the above values depending on its status
	value of 0 is empty space
	value of 1 is x
	value of 2 is o
rules
	if there are empty spaces (0s)
		if three 1s or 2s in a row - there is a winner
		if not - game not finished yet
	if all spaces are full and no winner - draw

psuedo
	loop through nested arrays
	check row first
		loop through arrays, if any have all same value - return that value for winner
	if no row winners - check columns
		loop through each arrays first el - if all the same return value, if not move to each arrays 2nd el, etc
	if no winner found
		if any value is 0 - game not finished
		if not - game is draw
algo
create var zeroPresent
check rows
	for loop from 0 - 2
		if any in arr are 0 - set zeroPresent to true
		if all arr[0] are same - set status to arr[0][0]
		if not, move to arr[1], arr[2]
check cols
	for loop from 0 - 2 i
		create var count
		second for loop from 0 - 2 j
			if arr[j][i] =  1, add to count, if = 2, minus count
			loop through each row(j) adding to count
		after loop - if count = 3, all are 1 - x won, set status to 1, break i-loop
								 if count = -3, all are 2 - o won, set status to 2, break i-loop
								 else, no winner, increase i
check draw/unfinished
	if zeroPresent - set status unfinished, else set status draw
*/

package main

import "fmt"

func IsSolved(board [3][3]int) (status int) {
	zeroPresent := false

	// check rows
	for i := 0; i < len(board); i++ {
		if board[i][0] == 0 || board[i][1] == 0 || board[i][2] == 0 {
			zeroPresent = true
		}

		if board[i][0] == board[i][1] && board[i][0] == board[i][2] {
			status = board[i][0]
			break
		}
	}
	if status > 0 {
		return status
	}
	// check cols
	for i := 0; i < len(board); i++ {
		var count int
		for j := 0; j < len(board[i]); j++ {
			if board[j][i] == 1 {
				count++
			} else if board[j][i] == 2 {
				count--
			}
		}
		if count == 3 || count == -3 {
			status = board[0][i]
		}
	}
	if status > 0 {
		return status
	}

	// check diagonals
	if board[0][0] == board[1][1] && board[0][0] == board[2][2] {
		status = board[1][1]
	} else if board[0][2] == board[1][1] && board[0][2] == board[2][0] {
		status = board[1][1]
	}
	if status > 0 {
		return status
	}

	// check draw/unfinished
	if zeroPresent {
		status = -1
		return status
	} else {
		return 0
	}
}

func main() {
	// not yet finished
	fmt.Println(IsSolved([3][3]int{
		{0, 0, 1},
		{0, 1, 2},
		{2, 1, 0},
	}) == -1)
	// winning row x
	fmt.Println(IsSolved([3][3]int{
		{1, 1, 1},
		{0, 2, 2},
		{0, 0, 0},
	}) == 1)
	// winning row o
	fmt.Println(IsSolved([3][3]int{
		{2, 2, 2},
		{0, 1, 1},
		{0, 0, 0},
	}) == 2)
	// winning column
	fmt.Println(IsSolved([3][3]int{
		{2, 1, 2},
		{2, 1, 1},
		{1, 1, 2},
	}) == 1)
	// draw
	fmt.Println(IsSolved([3][3]int{
		{2, 1, 2},
		{2, 1, 1},
		{1, 2, 1},
	}) == 0)
	// diagonal
	fmt.Println(IsSolved([3][3]int{
		{1, 2, 2},
		{2, 1, 1},
		{1, 2, 1},
	}) == 1)
}
