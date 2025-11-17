'use strict';

class Element{
    #innerText = '';

    children = [];

    constructor(text){
        this.#innerText = text;
    }

    setInnerText(text){
        this.#innerText = text;
    }

    getInnerText(){
        return this.#innerText;
    }

    addChild(elem){
        this.children.push(elem);
    }

    getChildren(){
        return this.children;
    }

    removeChild(child){
        const index = this.children.indexOf(child);
        if(index !== -1) this.children.splice(index,1);
    }

    render(){
        console.log(this.#innerText);
        this.children.forEach(c => c.render());
    }
};

const div = new Element('im the first div');
console.log(div);
div.render();

const h11 = new Element('im an h1');
div.addChild(h11);
div.render();
console.log(h11);
console.log();

console.log(div.getChildren());
div.removeChild(h11);
console.log(div);
div.render();
console.log('----------------------------------');

class Div extends Element{
    render(){
        console.log('im a div!!');
        super.render();
    }
}

const div2 = new Div('a');
div2.render();
console.log(div2);

const h2 = new Element('this is a h2 element in a div');
div2.addChild(h2);
const h3 = new Element('h3 in div');
div2.addChild(h3);
const div3 = new Div('check me out!');
div2.addChild(div3);
console.log('----------------------------------');
div2.render();
console.log(div2,h2);


console.log('----------------------------------');

class H1 extends Element{
    constructor(text){
        super(text);
    }

    render(){
        console.log('im a h1');
        super.render();
    }
}

const h4 = new H1('this is my h1 class');
h4.render();
console.log(h4);

console.log('-------------------');
const div5 = new Div('a');
const h5 = new H1('b');
const h6 = new H1('c');
div5.addChild(h5);
div5.addChild(h6);
div5.render();

div5.setInnerText('new div inner text');
div5.removeChild(h5);
div5.render();