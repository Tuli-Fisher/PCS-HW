'use strict';

function makecar(color){
        this.color = color,
        this.speed = 0;
      
};
const carFunctions = {
    go(speed){
        this.speed = speed;
        console.log(`The ${this.color} car is going ${speed} mph`);
    },
    print(){
         console.log(`This car is ${this.color} and its going ${this.speed} mph`);
    }
};
Object.assign(makecar.prototype,carFunctions);
makecar.prototype.newone = 5;
const mycar = new makecar('red');
console.log(mycar);
mycar.go(75);
mycar.print();
const mycar2 = new makecar('blue');
console.log(mycar2);
mycar2.go(55);
mycar2.print();

function car(color){
    this.color = color;

    this.speed = 0;
}
car.prototype.go = function go(speed){
    this.speed = speed;
        console.log(`The ${this.color} car is going ${speed} mph`);
    };
car.prototype.print = function print(){
    console.log(`This car is ${this.color} and its going ${this.speed} mph`);
};
const redCar = new car('red');
console.log(redCar);
redCar.go(75);
redCar.print();

function plane(color){
    car.call(this,color);
};
plane.prototype = Object.create(car.prototype);
plane.prototype.print = function print(){
    console.log(`the ${this.color} plane is FLYING ${this.speed} mph`)
}
const bluePlane = new plane('blue');
console.log(bluePlane);
bluePlane.go(500);
bluePlane.print();
