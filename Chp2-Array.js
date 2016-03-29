
var a1 = [1,2,3];
// JS allows array to store values of different types e.g. dynamic typed language.
console.log('original array:' + a1); //console can log array directly

/*
 In JavaScript, an array is a mutable object. We can easily add new elements to it. The
object will grow dynamically as we add new elements to it
*/
// pushing is O(1)

a1.push(4);
a1.push(5, 6);
console.log('pushing elements to the end of array:' + a1); 

//inserting is O(n) as it needs to shift space
a1.unshift(100); // insert into the first position of the array   
a1.unshift(98, 99);
console.log('pushing elements are the beginning of array:' + a1);

// removing at the end of array
a1.pop(); //O(1)
console.log('removing element at the end of array:' + a1);
//removing at the begining of array
a1.shift(); //O(n)
console.log('removing element at the beginning of array:' + a1);

// remove and insert element at a particular position
a1.splice(2, 3); // removing three elements starting from index 2
console.log('removing from a particular index:' + a1);
a1.splice(3, 0, -1, -2, -3);// insert three elements starting at index 3
console.log('inserting multiple elements into a particular index:' + a1);



//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
console.log('\n\nmore array operations...');
//concatenate arraies and return a new array
var a2 = [1, 2, 3];
var a3 = [4, 5, 6];
var a4 = a2.concat(a3);
console.log('concatenated array:' + a4);
console.log('original array:' + a2);

//determine whether ALL elements satisfy a test; lazy evaluation
var t1 = a4.every(x => {
    console.log(x);
    return x < 5
});
console.log(t1);
var t2 = a4.every(x => x >= 0);
console.log(t2);

//filter an array
var a5 = a4.filter(x => (x & 1) === 0); // filter out odd numbers leaving even ones
console.log(a5);

// execute a specific function on each element of the array.
a4.forEach(x => console.log( x + ' is ' + ((x & 1) === 0 ? 'even' : 'odd')));

// join all elements into a string
console.log(a5.join('-'));

// search an element and return its position; failure will return -1.
console.log(a4.indexOf(3));

// create a new array of the same length by applying a function to each element 
var a6 = a4.map(x => (x & 1) === 1); // a boolean array 
console.log(a6);

// return a new array from a specified index
var a7 = a6.slice(1, a6.length - 1); // [a, b)
console.log(a7);

// whether ANY element passes a specific test 
var a8 = a5.some(x => x > 3);
console.log(a8);

// sort an array
console.log(['b', 'c', 'e', 'g'].sort());

// string format of array
console.log(a5.toString());
console.log(a2.valueOf());

// reduce
console.log(a4.reduce((previous, current, index) =>
 {
     console.log(index);
     return previous + current
 }, 10));
 
 
 
 // by default it sorts the elements lexicographically and it assumes all the elements are ASCII strings
 var randomArray = [9, 18, 32, 4, 58, 1];
 console.log(randomArray.sort());
 // to probaby sort number passing a compare function;
 console.log(randomArray.sort((x, y) => x - y));
 // in ASCII upper case letter appears before lower case letter so to sort alphbetically pass in a customer compare function name(params) {
 var stringArray = ['Andy', 'andy', 'Xen', 'Pat'];
 console.log(stringArray.sort(
     (a, b) => a.toLowerCase() > b.toLowerCase() ? 
            1 : -1));    
 
 
 
 function quickSort(array) {
     if (array.length < 2)
        return array;
     
     var pivot = array[0];
     var less = array.filter(x => x < pivot);
     var larger = array.filter(x => x > pivot);
     return quickSort(less).concat(pivot, quickSort(larger));
 }
 
 console.log(quickSort([20, 5, 3, 1, 18, 50, 21]));