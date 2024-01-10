import './ModifyContainer.css'
import { useEffect, useState, useRef } from "react";
import Selection from './Selection';
const ModifyContainer = (props)=>{
    let[range,setRange]=useState(50);
    const passwordLength = useRef();

    let[upper,setUpper]= useState(false);
    let[lower,setLower]= useState(false);
    let[number,setNumber]= useState(false);
    let[symbol,setSymbol]= useState(false);

    function getChecked(checked, value){
        switch(value){
            case 'uppercase':
                setUpper(checked);
                break;
            case 'lowercase':
                setLower(checked);
                break;
            case 'number':
                setNumber(checked);
                break;
            case 'symbol':
                setSymbol(checked);
                break;
            default:
                console.log(value,"oh no");
                break;
        }
    }

    useEffect(()=>{
        props.getFunc(upper, lower, number, symbol);
    },[upper, lower, number, symbol])

    const printRange = ()=>{
       setRange(passwordLength.current.value);
    }

    useEffect(()=>{
        props.getRange(range);
    },[range])

    const selector = {
        number: 'Number',
        uppercase: 'UpperCase',
        lowercase: 'LowerCase',
        symbol: 'Symbol'
    }

    return(
        <section className="text-black flex flex-col justify-center items-start">
            <div className="flex justify-between gap-4 items-center bg-white w-full mt-8 py-2 px-4">
                <label for="length" className='text-blue-600'>Words</label>
                <input className="slider" ref={passwordLength} onChange={printRange} name="length" type="range" min={8} max={50}></input>
                <label for="length">{range}</label>
            </div>
            <small className='text-gray-500 ml-4 my-2'>length: 50</small>
            <div className='w-full flex flex-col'>
                <small className='text-start text-gray-500 ml-4 my-2'>INCLUDE</small>
                <Selection check={getChecked} label={selector.number}></Selection>
                <hr></hr>
                <Selection check={getChecked} label={selector.uppercase}></Selection>
                <hr></hr>
                <Selection check={getChecked} label={selector.lowercase}></Selection>
                <hr></hr>
                <Selection check={getChecked} label={selector.symbol}></Selection>
            </div>
        </section>
    )
}
export default ModifyContainer;