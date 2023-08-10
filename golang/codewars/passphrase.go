/*
Everyone knows passphrases. One can choose passphrases from poems, songs, movies names and so on but frequently they can be guessed due to common cultural references. You can get your passphrases stronger by different means. One is the following:

choose a text in capital letters including or not digits and non alphabetic characters,

    shift each letter by a given number but the transformed letter must be a letter (circular shift),
    replace each digit by its complement to 9,
    keep such as non alphabetic and non digit characters,
    downcase each letter in odd position, upcase each letter in even position (the first character is in position 0),
    reverse the whole result.

Example:

your text: "BORN IN 2015!", shift 1

1 + 2 + 3 -> "CPSO JO 7984!"

4 "CpSo jO 7984!"

5 "!4897 Oj oSpC"


arguments
	string - phrase to modify
	int - number of letters to shift to right
return
	string - modified depending on int passed in and other specs
modification specs
	each alpha letter replaced by letter n spots over in alphabet (1- a -> b, f -> g; 3- a -> d, f -> i)
	any digits changed to 9 - digit
	any other char remains the same
	letters in even index are capitalized, odd index are lowercased
	reverse the string by chars
rules
	special chars/whitespace stays the same
	inputs should have all caps
	letter shift is circular - z + 1 == a
pseudo
	create alphabet string
	iterate through input string using index + char value
		if letter
			find index of letter in alphabet
			replace letter with alphabet[index + n]
			if input index is even
				letter should be cap
			else
				letter should be lower
		if number
			replace digit with 9 - digit
		else
			leave char alone
	reverse string
algo
	import strings
	alphabet := "" - ALL CAPS
	for index, char := s range {}
		if string.Contains(alphabet, char)
			find alphabet index of char
			save alphabet[charIndex + n] in var newLetter
			if index is even
				add newLetter to FRONT OF result string
			else
				add lowercase newLetter to FRONT OF result string
		else if string.Contains("0-9", char)
			add string(9 - int(char)) to FRONT OF result string
		else
			add char to FRONT OF result string
	
smaller algo
	find index of char in alphabet
		iterate through alphabet - if alphaChar == char, return index
		try Strings.Index(alphabet, char)
	add char to front of string
		result = char + result
	replace letter with lowercase letter
		ToLower()

*/

package main
import (
	"fmt"
	"strings"
	"strconv"
	"unicode"
)

func PlayPass(s string, n int) (result string) {
	alphabet := "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

	for index, v := range s {
		char := string(v)
		if strings.Contains(alphabet, char) {
			alphaIndex := strings.Index(alphabet, char)
			newIndex := alphaIndex + n
			for newIndex > 25 {
				newIndex -= 26
			}
			char = string(alphabet[newIndex])
			if index % 2 != 0 {
				char = strings.ToLower(char)
			}
		} else if unicode.IsDigit(v) {
			num, err := strconv.Atoi(char)
			if err != nil {
				return
			}
			num = 9 - num
			char = strconv.Itoa(num)
		}
		result = char + result
	}
	
	return
}

func main() {
	fmt.Println(PlayPass("I LOVE YOU!!!", 1)) // "!!!vPz fWpM J"
	fmt.Println(PlayPass("I LOVE YOU!!!", 0)) // "!!!uOy eVoL I"
	fmt.Println(PlayPass("I LOVE YOU!!!", 4)) // "!!!ySc iZsP M"
	fmt.Println(PlayPass("AAABBCCY", 1)) // "zDdCcBbB"
	fmt.Println(PlayPass("BORN IN 2015!", 1)) // "!4897 Oj oSpC"

	// fmt.Println("A")
	// fmt.Println(strings.ToLower("A"))
	// str := "abc"
	// fmt.Println(str)
	// str = "xyz" + str
	// fmt.Println(str)
	// fmt.Println(strings.Index(str, "P"))
}

