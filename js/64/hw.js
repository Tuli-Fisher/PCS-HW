'use strict';

const daysModule = function() {

    const days = ['Sunday','Monday','Tuesday'];

    console.log(days);

    return{
        findDay(index){
            return days[index - 1];
        },
        findIndex(day){
            return days.findIndex((d) => d === day ) + 1;
        }
    };
}();



console.log(daysModule.findDay(1));
console.log(daysModule.findDay(3));

console.log("findIndex('Monday')",daysModule.findIndex('Monday'));
console.log("findIndex('Sunday')",daysModule.findIndex('Sunday'));