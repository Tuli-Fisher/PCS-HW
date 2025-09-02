
(function(){
    'use strict';

    function bankMaker(){

        // let balance = 0;

        return{
            balance: 0,
            performTransact(ammt){
                this.balance += ammt;
            },

            print(){
                console.log(`the balance is $${this.balance}`);
            }
        };
    };

    const bank1 = bankMaker();
    bank1.performTransact(50);
    bank1.performTransact(25);
    // bank1.print.call('bank1');
    bank1.print();

    // const bank2 = bankMaker();
    // bank2.performTransact(-50);
    // bank2.performTransact(25);
    // const bank2print = bank2.print.bind('bank2');
    // bank2print();
    console.log('end of the first type');
    console.log('');
}());

(function(){
    'use strict';

    const bank3 = {
        balance: 0,
        id: 3
    };

    const bank4 = {
        balance: 0,
        id: 4
    };

    function performTransact2(ammt){
        this.balance += ammt;
    };

    function printBalance(bank){
        console.log(`this is ${bank.id} banks balance $${bank.balance}`);
    };

    performTransact2.call(bank3,15);
    printBalance(bank3);
    performTransact2.call(bank3,15);
    printBalance(bank3);

    const bank4trns = performTransact2.bind(bank4);
    bank4trns(50);
    printBalance(bank4);

    console.log('end of second');
    console.log('');

    const quickFiftyin3 = performTransact2.bind(bank3,50);
    quickFiftyin3();
    printBalance(bank3);
}());