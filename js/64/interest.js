'use strict';

const interestUtil = function(){

    let numYrs;
    let rate;

    return {
        setRate(r){
            rate = r;
        },

        setYrs(y){
            numYrs = y;
        },

        CalculateMortgage(prin){
            return (prin * (rate / 100)) * numYrs;
        }
    };
}();

console.log(interestUtil.setRate(2),interestUtil.setYrs(30),interestUtil.CalculateMortgage(100000));
console.log(interestUtil.setRate(5),interestUtil.setYrs(15),interestUtil.CalculateMortgage(20000));
console.log(interestUtil.setRate(1),interestUtil.setYrs(15),interestUtil.CalculateMortgage(20000));

