const userMethods = {
  login() {
    return `${this.name} has logged in.`;
  }
};

// 2. Write the factory function
function createUser(name, role) {
  // Create a new object linked to userMethods securely at birth
  const newObj = Object.create(userMethods);
  
  // Assign individual state properties
  newObj.name = name;
  newObj.role = role;
  
  return newObj;
}

// 3. Usage
const user1 = createUser("Alice", "Admin");
console.log(user1.login());

// Factory Function creating person
let Person = function (name, age) {

    // creating person object
    let person = {};

    // parameters as keys to this object  
    person.name = name;
    person.age = age;

    // function to greet
    person.greeting = function () {
        return (
            'Hello I am ' + person.name
            + '. I am ' + person.age
            + ' years old. '
        );
    };
    return person;
};

let person1 = Person('Abhishek', 20);
console.log(person1.greeting());

let person2 = Person('Raj', 25);
console.log(person2.greeting());


function createRobot(name) {
    return {
        name: name,
        talk: function () {
            console.log('My name is '
                + name + ', the robot.');
        }
    };
}

//Create a robot with name Chitti
const robo1 = createRobot('Chitti');

robo1.talk();


// Create a robot with name Chitti 2.O Upgraded
const robo2 = createRobot('Chitti 2.O Upgraded');

robo2.talk();
