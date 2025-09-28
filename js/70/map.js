// eslint-disable-next-line no-unused-vars
const ourMap = function(array , callback){
    'use strict';

    

    const newArray = [];

    for(let i = 0; i < array.length; i++){
          newArray.push(callback(array[i]));
    };

    return newArray;

};