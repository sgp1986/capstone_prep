package main

import "fmt"

// public class Person {
// 	private String name;

// 	public String getName() {
// 		return this.name;
// 	}
// }

// public class Saiyan {
// 	private Person person;

// 	public String getName() {
// 		return this.person.getName();
// 	}
// }

type Person struct {
	Name string
}

func (p *Person) Introduce() {
	fmt.Printf("Hi, I'm %s\n", p.Name)
}

type Saiyan struct {
	*Person
	Power int
}

func main() {
	goku := &Saiyan{
		Person: &Person{"Goku"},
		Power:  9001,
	}

	fmt.Println(goku.Name)
	fmt.Println(goku.Person.Name)
	goku.Introduce()
}
