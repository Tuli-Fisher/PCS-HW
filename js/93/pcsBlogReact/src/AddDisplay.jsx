import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function AddDisplay() {
    const [display, setDisplay] = useState();

    const adds = ['shoes','pants','cars']
    useEffect(() =>{
        let index = 0;
        let interval = setInterval(() =>{
            setDisplay(adds[index++]);
            if(index === adds.length) index = 0;
        },5000);

        return () =>{
            clearInterval(interval);
        }
    });


  return (
    <div style={{
        fontWeight:'bolder',
        display:'flex',
        justifyContent:'center',
        alignContent:'center',
        height:'5em',
        color:'red'
    }}><h1>{display}</h1></div>
  )
}
