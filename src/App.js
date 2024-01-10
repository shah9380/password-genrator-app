import logo from './logo.svg';
import './App.css';
import PasswordContainer from './components/PasswordContainer';
import ModifyContainer from './components/ModifyContainer';
import { useState } from 'react';

function App() {
  let[upper,setUpper]= useState(false);
  let[lower,setLower]= useState(false);
  let[number,setNumber]= useState(false);
  let[symbol,setSymbol]= useState(false);
  let[range,setRange]= useState(50);

  const getSelections = (upperChecked, lowerChecked, numberChecked, symbolChecked)=>{
          setUpper(upperChecked);
          setLower(lowerChecked);
          setNumber(numberChecked);
          setSymbol(symbolChecked);
  }   

  const getRange = (value)=>{
    setRange(value);
  }
  return (
    <div className="App">
      <PasswordContainer number={number} range={range} upper={upper} lower={lower} symbol={symbol}></PasswordContainer>
      <ModifyContainer getRange={getRange} getFunc={getSelections}></ModifyContainer>
    </div>
  );
}

export default App;
