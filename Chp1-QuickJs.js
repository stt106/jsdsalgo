var globalV1 = "global1";
var globalV2 = "global2";

function f1() {
    var globalV1 = "local variable within a function scope";
    console.log(globalV1);
}

function f2() {
    globalV2 = "updated global variable within a function scope";
    console.log(globalV2);
}

console.log("%%% testing global variable %%%")
console.log(globalV1);
console.log(globalV2);
f1();
f2();
console.log(globalV1);
console.log(globalV2);


console.log("\n %%% testing typeof and delete operator %%%");
console.log("typeof [1,2,3]: " + typeof([1,2,3] + "; i.e. array is of type object!"));
var person = {
    name : "john",
    age : 20
}
delete person.age;
console.log(person);


console.log("\n %%% testing true and false %%%");
function testTruthy(value) {
    var temp = value;
    if (value === '')
        temp = 'empty string';
    console.log(temp + " is " + (value ? " True" : " False"));
}
testTruthy(null);
testTruthy(undefined);
testTruthy(0);
testTruthy(false);
testTruthy(new Boolean(false)) // object is always true!
testTruthy(-1);
testTruthy({}); // object is true
testTruthy(NaN);
testTruthy(new Number(NaN)); // object is awlays true
testTruthy('');
testTruthy(new String(''));
testTruthy(person.name); // string length > 0 is always true
testTruthy(person.age);



console.log("\n %%% testing === %%%\nIt doesn't do coerison and only two objects of the same primitive types are then compared with values");
console.log(NaN === NaN); // false
var p2 = {name : "John"};
console.log(p2 === person); // object equality is the same as c# which compares object identity not 'equality'


console.log("\n %%% testing OOP in JS %%%");
function Book(title, year) {
    this.title = title;
    this.year = year;
    
    // define an instance function 
    this.printYear = () => console.log("instance function of an object: " + this.year);
}

Book.prototype.printTitle = function() {
     console.log(this);
     console.log(this.title);
}

// doesn't work; cannot use lambda to define a prototype function.
Book.prototype.printTitle2 = () => {
    var self = this;
    console.log(self);
    console.log(self.title);
}

var book = new Book('foo book', 1983);
book.printTitle2();
book.printTitle();
book.printYear();