
(function(){
    'use strict';


    let numButtons = 1;

    // document.querySelector('#firstButton').addEventListener('click', addButton);


    // function addButton(){
    //     const newButton = document.createElement('button');

    //     const text = ++numButtons;

    //     newButton.textContent = text;

    //     newButton.addEventListener('click', addButton);

    //     document.querySelector('div').appendChild(newButton);
    // };


    document.querySelector('div').addEventListener('click', addButton);

    function addButton(){
        const newButton = document.createElement('button');

        const text = ++numButtons;

        newButton.textContent = text;

        document.querySelector('div').appendChild(newButton);
    };

}());