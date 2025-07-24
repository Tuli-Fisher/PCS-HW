'use strict';

function cTof(){
    let c = prompt('enter a celsius temp');
    c = (c/5)*9+32;
    alert(`your temperature in farenheit is ${c}`);
}

function fToC(){
    let v = prompt('enter a farenheit temp');
    v = (v-32)*5/9;
    alert(`your temperature in celsius is ${v}`);
}

const cButton = document.querySelector(`#cfbutton`);

cButton.addEventListener('click',cTof);

const fButton = document.querySelector(`#fcbutton`);

fButton.addEventListener('click',fToC);


//////////////////////////////


function multiply(a,b){
    return a * b;
};

console.log(multiply(2,8));

console.log(multiply(2,5));

console.log(multiply(1,4));

function getMultiply(){
    return function multiply(a,b){
    return a * b;
    };   
}
const a = getMultiply();

console.log(a(2,5));

console.log(a(1,5));

console.log(a(2,4));

function getMultiply2(a){
    return function multiply(b){
    return a * b;
    };   
}

const multiplierx5 = getMultiply2(5);

console.log(multiplierx5(5));

console.log(multiplierx5(2));