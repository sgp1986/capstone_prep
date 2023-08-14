"use strict";
// Basic Types
let id = 5;
let company = 'Traversy Media';
let isPublished = true;
let x = 'Hello';
x = true;
let age;
age = 30;
// Arrays
let ids = [1, 2, 3, 4, 5];
let arr = [1, true, 'hello'];
// Tuple
let person = [1, 'Steve', true];
// Tuple Array
let employee;
employee = [
    [1, 'Steve'],
    [1, 'Joy'],
    [1, 'Jay'],
];
// Union
let pid = 22;
pid = '22';
// Enum
var Direction1;
(function (Direction1) {
    Direction1[Direction1["Up"] = 1] = "Up";
    Direction1[Direction1["Down"] = 2] = "Down";
    Direction1[Direction1["Left"] = 3] = "Left";
    Direction1[Direction1["Right"] = 4] = "Right";
})(Direction1 || (Direction1 = {}));
var Direction2;
(function (Direction2) {
    Direction2["Up"] = "Up";
    Direction2["Down"] = "Down";
    Direction2["Left"] = "Left";
    Direction2["Right"] = "Right";
})(Direction2 || (Direction2 = {}));
const user = {
    id: 1,
    name: 'John'
};
// console.log(user)
// Type Assertion
let cid = 1;
// let customerId = <number>cid
// customerId = true
let customerId = cid;
// customerId = true
// Functions
function addNum(x, y) {
    return x + y;
}
// console.log(addNum(1, 2))
// console.log(addNum(1, 'a'))
function log(message) {
    console.log(message);
}
log('check');
log(2);
const user1 = {
    id: 1,
    name: 'John'
};
const p1 = 1;
const add = (x, y) => x + y;
const sub = (x, y) => x - y;
// Classes
class Person {
    register() {
        return `${this.name} is now registered`;
    }
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const steve = new Person(1, 'Steve');
steve.register();
// Subclass
class Employee extends Person {
    constructor(id, name, position) {
        super(id, name);
        this.position = position;
    }
}
const emp = new Employee(3, 'Joy', 'Nurse');
console.log(emp.register());
// Generics
function getArray(items) {
    return new Array().concat(items);
}
let numArr = getArray([1, 2, 3, 4]);
let strArr = getArray(['a', 'b', 'c', 'd']);
console.log(numArr);
console.log(strArr);
