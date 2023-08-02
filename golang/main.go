package main

import "fmt"

type Saiyan struct {
	Name   string
	Power  int
	Father *Saiyan
}

func (s *Saiyan) Super() {
	s.Power += 10000
}

// func NewSaiyan(name string, power int) *Saiyan {
// 	return &Saiyan{name, power}
// }

func main() {
	// goku := NewSaiyan("Goku", 9001)
	// goku.Super()
	// fmt.Println(goku.Power)

	gohan := &Saiyan{
		Name:  "Gohan",
		Power: 1000,
		Father: &Saiyan{
			Name:   "Goku",
			Power:  9001,
			Father: nil,
		},
	}
	fmt.Println(gohan.Power)
}
