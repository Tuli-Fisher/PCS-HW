const hwMessageBox = (function(){
    'use strict';

    const modalDiv = document.createElement('div');
    modalDiv.style.position = 'absolute';
    modalDiv.style.width = '100%';
    modalDiv.style.height = '100%';
    modalDiv.style.left = '0';
    modalDiv.style.top = '0';
    modalDiv.style.backgroundColor = 'lightblue';
    modalDiv.style.opacity = '.5';
    modalDiv.style.display = 'none';
    // modalDiv.style.zIndex = 1;

   document.body.appendChild(modalDiv);

    return function(msg, modal,buttons = false,callback){
        const box = document.createElement('div');
        box.style.boxSizing = 'border-box';
        box.style.backgroundColor = 'lightcyan';
        box.style.border = '1px solid black';
        box.style.padding = '1em';
        box.style.height = '12em';
        box.style.width = '16em';
        box.style.position = 'absolute';
        box.style.top = '50%';
        box.style.left = '50%';
        box.style.marginTop = '-6em';
        box.style.marginLeft = '-8em';
       

        const msgDiv = document.createElement('div');
        msgDiv.innerText = msg;
        msgDiv.style.overflow = 'auto';
        msgDiv.style.height = '7em';

        const buttonDiv = document.createElement('div');
        buttonDiv.style.position = 'absolute';
        buttonDiv.style.bottom = '.5em';
        buttonDiv.style.textAlign = 'center';
        buttonDiv.style.width = '100%';
        buttonDiv.style.left = 0;

        function clearBox(){
            box.remove();
            if(modal === true){
                modalDiv.style.display = 'none';
            }
        };

        if(!buttons || !Array.isArray(buttons)){
            const okButton = document.createElement('button');
            okButton.innerText = 'ok';

            buttonDiv.appendChild(okButton);

            okButton.addEventListener('click',()=>{
              clearBox();
            });
        }
        else{

            buttons.forEach(e => {

                if(typeof e === 'string'){
                    const newbutton = document.createElement('button');
                    newbutton.innerText = e;

                    newbutton.addEventListener('click',()=>{
                        clearBox();
                        if(typeof callback === 'function'){
                            callback(newbutton.innerText);
                        }
                    });
                    buttonDiv.appendChild(newbutton);
                }

            });

        }

        
        box.appendChild(msgDiv);
        box.appendChild(buttonDiv);
        document.body.appendChild(box);

        if(modal){
            modalDiv.style.display = 'inline-Block';
        }

    };

}());