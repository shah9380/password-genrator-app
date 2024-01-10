import './PasswordContainer.css'
import { useState, useEffect } from 'react';

const PasswordContainer = (props)=>{
    const obj = {
        upperCase: {
          min: 65,
          max: 90,
        },
        lowerCase: {
          min: 97,
          max: 122,
        },
        symbols: {
          min: 33,
          max: 47,
        },
        numbers: {
          min: 48,
          max: 57,
        },
    };
    let [passwordArray,setPasswordArray] = useState([]);
    function asciiToChar(asciiValue) {
        return String.fromCharCode(asciiValue);
    }
    const getRandomAscii = (min, max) => {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    };

    const getRandomChar = (category) => {
        return asciiToChar(getRandomAscii(obj[category].min, obj[category].max));
    };

    let [passKey, setPassKey] = useState([]);

    let [isUpperChecked, setUpperChecked] = useState(false);
    let [isLowerChecked, setLowerChecked] = useState(false);
    let [isNumberChecked, setNumberChecked] = useState(false);
    let [isSymbolChecked, setSymbolChecked] = useState(false);
    let[secure,setSecure]=useState('excellent');

    useEffect(()=>{
        setLowerChecked(props.lower);
        setUpperChecked(props.upper);
        setNumberChecked(props.number);
        setSymbolChecked(props.symbol);
        let num = 0;
        if(props.lower){
            num +=1;
        }
        if(props.upper){
            num +=1;
        }
        if(props.number){
            num +=1;
        }
        if(props.symbol){
            num +=1;
        }
        if(num === 1){
            setSecure('Bad');
        }else if(num === 2){
            setSecure('Poor');
        }else if(num === 3){
            setSecure('Good');
        }else if(num === 4){
            setSecure('Excellent')
        }else{
            setSecure('select any case')
        }
    },[props.upper, props.lower, props.number, props.symbol])

    let[compo,setCompo]= useState(8);
    let[btn,setBtn]= useState(false);

    useEffect(() => {
        setPassKey([]);
        // console.log("isUpperChecked:", isUpperChecked);
        // console.log("isLowerChecked:", isLowerChecked);
        // console.log("isNumberChecked:", isNumberChecked);
        // console.log("isSymbolChecked:", isSymbolChecked);
        if (isUpperChecked) {
            passKey.push("upperCase");
          }
          if (isLowerChecked) {
            passKey.push("lowerCase");
          }
          if (isSymbolChecked) {
            passKey.push("symbols");
          }
          if (isNumberChecked) {
            passKey.push("numbers");
          }
          const pswdArray = [];
          if(passKey.length>0){
            passKey.map((data)=>{
                let chart = getRandomChar(data);
                pswdArray.push(chart);
            })
            for(let i=passKey.length;i<compo;i++){
                let idx = getRandomAscii(0,passKey.length-1);
                let chart = getRandomChar(passKey[idx]);
                pswdArray.push(chart);
            }
          }
          setPasswordArray(pswdArray);
          setBtn(false);
          setPassword(passwordArray.join(''));
    }, [btn]);

    useEffect(()=>{
        setCompo(props.range);
    },[props.range])

    let [password,setPassword] = useState(passwordArray.join(''));

    const handleCopyClick = async () => {
        try {
          // Use navigator.clipboard.writeText to write text to the clipboard
          await navigator.clipboard.writeText(password);
    
          // Alert or perform other actions to indicate successful copy
          alert('Password copied to clipboard!');
        } catch (err) {
          // Handle any errors that may occur during copying
          console.error('Unable to copy to clipboard:', err);
        }
    };
    return(
        <section className="bg-green-600 pt-6">
            <div className="flex justify-between items-center px-6">
                <h2 className='text-xl text-amber-900 font-bold'>Password Generator</h2>
                <div className="flex justify-center items-center gap-4">
                    <div onClick={()=>{
                        if(password !== ''){
                            handleCopyClick();
                        }else{
                            alert('generate password first')
                        }
                    }} className="cursor-pointer active:scale-[0.92] duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 448 512"><path fill="#ffffff" d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/></svg>
                    </div>
                    <div className="load cursor-pointer duration-300" onClick={()=>{setBtn(true);
                    if(!isLowerChecked && !isNumberChecked && !isSymbolChecked && !isUpperChecked){
                        alert("please check any of the below case");
                    }}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="18" viewBox="0 0 512 512"><path fill="#fafafa" d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/></svg>
                    </div>
                </div>
            </div>
            <div className='text-box text-start my-8 text-white font-medium px-6'>
                {password}
            </div>
            <div className='flex justify-between bg-green-700 px-6 py-2 text-white'>
                <p>{secure}</p>
                <button onClick={()=>{if(password !== ''){handleCopyClick()}else{alert('please generate first')}}} className='border px-4 text-center rounded-3xl bg-green-800 active:scale-[0.90] ease-in-out select-none duration-300'>Use</button>
            </div>
        </section>
    )
}
export default PasswordContainer;