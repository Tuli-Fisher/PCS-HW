window.pcs = function (selector) {
  'use strict';

  function getElement(selector) {
    return document.querySelector(selector);
  }

  function setCss(element, property, value) {
    //console.log('in setCss', property);
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  function on(element, event, callback) {
    element.addEventListener(event, callback);
  }

  const element = getElement(selector);

  return {
    // getElement: getElement,
    /*setCss,
    getCss,*/
    css: function (property, value) {
      if (arguments.length === 1) {
        return getCss(element, property);
      } else {
        return setCss(element, property, value);
      }
    },

    hide: ()=> setCss(element,'display','none'),
    show: () => setCss(element,'display','inline-block'),

    on: (event, callback) => {
      on(element, event, callback);
    },
    sparkle:(lengthOfTime,changeSpeed)=>{
      const colors = ['crimson', 'royalblue', 'mediumseagreen','goldenrod','orchid', 'coral' ];
      let index = 0;
      
      const interval = setInterval(()=>{
        element.style.color = colors[index++];
        if(index === colors.length){ index = 0;};
      },changeSpeed);

      setTimeout(() => {
        clearInterval(interval);
        index = 0;
      }, lengthOfTime);
      
    },
    click: (callback) => on(element, 'click', callback)
  };
};