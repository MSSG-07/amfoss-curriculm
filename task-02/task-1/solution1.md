## VARIABLES AND DATATYPES

### ASSIGNMENT:

***Data Types Practice;***

**Objects**: The *object* data type can be used to store the details of products and consumer details \
**Arrays**: The *arrays* can be used to store the products added to cart \
**Numbers**: The *Number* data type is used to track prices,quantities and total the customer's purchase. \
**Strings**: The *String* data type can be used to store name of products, product description,consumer deatils,etc...\
**Booleans (true/false)** : The *Boolean* data type can be used to compare the availabilty of products or check for discounts and even to fillter the products based on rating, price, brand, etc... 

### CHALLENGE:

***`let age = 1; let Age = 2; age == Age` (resolves `false` -- why?)***
- In JavaScript, the variable names are case senstitive. Therefore `age` and `Age` are treated as different variables and they store different values .
- `age == Age`: compare the value they store i.e,`1 == 2`, which is false and hence return the value `False` .

## METHODS AND FUNCTIONS

### ASSIGNMENT:

***Function that does not return value***
```javascript
function greet(name) {
  console.log(`HELLO ${name}!`);
}
greet("AYRUS"); // Output: HELLO AYRUS!
```

***Function that returns value***
```javascript
function add(x,y) {
    return x+y;
}
console.log("Addition:", add(7,17)); // Output: Addition: 24
```

***Function with default parameters***
```javascript
function greet(name = "Guest", greeting = "Hello") {
    return `${greeting} ${name}!`;
}

console.log(greet()); // Output: Hello Guest!
console.log(greet("Ayrus")); // Output: Hello Ayrus!
console.log(greet("Irhtayag", "Hi")); // Output: Hi Irhtayag!

```

***Function with mix of parameters***
```javascript
function introduce(name, age = 18) {
  console.log(`Hi, I'm ${name} and I'm ${age} years old.`);
}
introduce("Ayrus", 17); // Output: Hi, I'm Ayrus and I'm 17 years old.
introduce("Irhtayag"); // Output: Hi, I'm Irhtayag and I'm 18 years old. 
```

### CHALLENGE:
***Articulate in one sentence the difference between functions and methods.*** \
*A function is an independent block of reusable code, whereas a method is a function that is associated with an object and called using that object.*

## MAKING DECISIONS

### ASSIGNMENT:
***Grading Systems***
```javascript
let allStudents = ['A', 'B-', 1, 4, 5, 2]; 
let studentsWhoPass = []; 

for (let i = 0; i < allStudents.length; i++) {
    let grade = allStudents[i];
    if (typeof grade === "number") {
        if (grade >= 3) {
            studentsWhoPass.push(grade);
        }
    } 
    else if (typeof grade === "string") {
        if (grade === "A" || grade === "A-" || grade === "B" || grade === "B-" || grade === "C" || grade === "C-") {
            studentsWhoPass.push(grade);
        }
    }
}
console.log(studentsWhoPass); // Output: [ 'A', 'B-', 4, 5 ]
```


### CHALLENGE:
***Using if else***
```javascript
let num = -5;
let result;
if (num >= 0) {
    result = "Positive";
} else {
    result = "Negative";
}
console.log(result); // Output: Negative
```

***Using ternary operator***
```javascript
let num = -5;
let result = num >= 0 ? "Positive" : "Negative";

console.log(result); // Output: Negative
```

## ARRAYS AND LOOPS

### ASSIGNMENT:
***Create a program that lists every 3rd number between 1-20 and prints it to the console.***
```javascript
for (let i = 1; i <= 20; i += 3) {
  console.log(i);
}
/* Output:
1
4
7
10
13
16
19
*/
```

### CHALLENGE:
***Array loop***
```javascript
let pokemonList = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Jigglypuff"];
for (let i = 0; i < pokemonList.length; i++) {
  console.log(pokemonList[i]);
}
```

***forEach loop***
```javascript
let pokemonList = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Jigglypuff"];
pokemonList.forEach(pokemon => console.log(pokemon));
```

***for-of loop***
```javascript
let pokemonList = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Jigglypuff"];
for (let pokemon of pokemonList) {
  console.log(pokemon);
}
```
***Using map***
```javascript
let pokemonList = ["Pikachu", "Charmander", "Bulbasaur", "Squirtle", "Jigglypuff"];
pokemonList.map(pokemon => console.log(pokemon));
```
***Output***
All the loops give the same output.
```javascript
/*
Pikachu
Charmander
Bulbasaur
Squirtle
Jigglypuff
*/
```
