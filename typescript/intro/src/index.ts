// Basic Types
let id: number = 5
let company: string = 'Traversy Media'
let isPublished: boolean = true
let x: any = 'Hello'
x = true
let age: number
age = 30

// Arrays
let ids: number[] = [1, 2, 3, 4, 5]
let arr: any[] = [1, true, 'hello']

// Tuple
let person: [number, string, boolean] = [1, 'Steve', true]
// Tuple Array
let employee: [number, string][]

employee = [
  [1, 'Steve'],
  [1, 'Joy'],
  [1, 'Jay'],
]

// Union
let pid: string | number = 22
pid = '22'

// Enum
enum Direction1 {
  Up = 1,
  Down,
  Left,
  Right
}

enum Direction2 {
  Up = 'Up',
  Down = 'Down',
  Left = 'Left',
  Right = 'Right'
}

// console.log(Direction1.Up)
// console.log(Direction1.Left)
// console.log(Direction2.Up)
// console.log(Direction2.Left)

// Object
type User = {
  id: number,
  name: string
}

const user: User = {
  id: 1,
  name: 'John'
}

// console.log(user)

// Type Assertion
let cid: any = 1
// let customerId = <number>cid
// customerId = true
let customerId = cid as number
// customerId = true

// Functions
function addNum(x: number, y: number): number {
  return x + y
}

// console.log(addNum(1, 2))
// console.log(addNum(1, 'a'))

function log(message: string | number): void {
  console.log(message)
}

log('check')
log(2)
// log(true)

// Interfaces
interface UserInterface {
  readonly id: number, // cannot modify
  name: string,
  age?: number // ? means optional
}

const user1: UserInterface = {
  id: 1,
  name: 'John'
}

type Point = number | string
const p1: Point = 1
// interfaces cannot be used with primitives like this
  // objects only

interface MathFunc {
  (x: number, y: number): number
}

const add: MathFunc = (x:number, y: number): number => x + y
const sub: MathFunc = (x:number, y: number): number => x - y

interface PersonInterface {
  id: number
  name: string,
  register(): string
}

// Classes
class Person implements PersonInterface {
  id: number
  name: string
  register() {
    return `${this.name} is now registered`
  }

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

const steve = new Person(1, 'Steve')

steve.register()

// Subclass
class Employee extends Person {
  position: string

  constructor(id: number, name: string, position: string) {
    super(id, name)
    this.position = position
  }
}

const emp = new Employee(3, 'Joy', 'Nurse')

console.log(emp.register())

// Generics
function getArray<T>(items: T[]): T[] {
  return new Array().concat(items)
}

let numArr = getArray<number>([1,2,3,4])
let strArr = getArray<string>(['a','b','c','d'])

console.log(numArr)
console.log(strArr)


//create react app with typescript
// npx create-react-app . --template typescript
  // . - makes files in current folder
  // --template typescript - replace js files with ts


