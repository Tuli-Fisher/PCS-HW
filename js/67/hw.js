
(function(){
    'use strict';

   const log = [];

    const colorinput = document.querySelector('#color');
    const bgcolorinput = document.querySelector('#bgcolor');


    function colorlogger(c){
        const colorLog={
        color: c,
        time: new Date()
        };

        log.push(colorLog);

        console.log(colorLog);

        if(log.length === 1){
            document.querySelector('#tbody').deleteRow(0);
        }

        const row = document.querySelector('#tbody').insertRow();
        const cell = row.insertCell();
        const cell2 = row.insertCell();
        cell.innerText = colorLog.color;
        cell2.innerText = colorLog.time.toLocaleTimeString();
    };

    colorinput.addEventListener('change', e=>{
        document.body.style.color = e.target.value;

        colorlogger(e.target.value);
    });

    bgcolorinput.addEventListener('change', function(){
        document.body.style.backgroundColor = this.value;

        colorlogger(this.value);
    });


}());