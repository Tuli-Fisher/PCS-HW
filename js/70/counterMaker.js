window.app = window.app || {};

(function( app ){
    'use strict';

    app = app || {};

    let numCreated = 0;
   

    app.getCounter = function(){
        numCreated++;
            
        let count = 0;


        return {
            increment:function  (){
                count++;
            },
        
            print:function (){
                console.log(` ${count} ppl were counted`);
            } 
        };
    };

    app.ammtCreated = function(){
        console.log(`this is the number of counters created: ${numCreated}`);
    };
    
}(window.app));