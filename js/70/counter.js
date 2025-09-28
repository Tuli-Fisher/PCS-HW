window.app = window.app || {};

(function( app ){
    'use strict';

    app = app || {};

    let count = 0;

    app.counter = {
        increment:function  (){
        count++;
        },
        
        print:function (){
            console.log(count);
        }
    };

}(window.app));