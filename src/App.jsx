import React, { useState } from 'react';
import refresh from '/public/refresh.svg';
import Info from './Info';

export default function App() {
  const [number, setNumber] = useState(generateRandomNumber());
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);

  function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  function checkInputValidity(input) {
    const userInput = input.split('').map(Number);
    const systemNumber = number.toString().split('').map(Number);
    
    for (let i = 0; i < userInput.length; i++) {
      if (!systemNumber.includes(userInput[i])) {
        return false;
      }
    }
    return true;
  }

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (input.length === 6 && checkInputValidity(input)) {
      const newScore = score + parseInt(input);
      setScore(newScore);
      setInput('');
      setNumber(generateRandomNumber());
    } else {
      setInput('');
    }
  }
  
  const clickHandle = e => {
    setScore(0);
    setNumber(generateRandomNumber());
    setInput('')
  }

  return (
    <main className="max-w-4xl mx-auto py-20 pt-96 relative">
      <h4 className="text-center text-6xl mb-10 pt-96">{number}</h4>
      <form className="flex flex-col items-end justify-end max-w-xl mx-auto relative" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center w-full">
          <input type="number"
            className="p-4 bg-zinc-950/20 text-white border border-zinc-950 border-2 rounded-md text-center mr-3 flex-1"
            value={input}
            autoFocus={true}
            onBlur={e => e.target.focus()}
            onChange={handleInputChange}
          />
          <button type="submit" className="p-4 bg-zinc-950/20 hover:bg-zinc-950/60 transition duration-350 text-white border border-zinc-950 border-2 rounded-md text-center mr-3">Gönder</button>
          <button className="p-4 bg-zinc-950/20 hover:bg-zinc-950/60 transition duration-350 text-white border border-zinc-950 border-2 rounded-md text-center"
                  onClick={clickHandle}><img src={refresh} alt="" /></button>
        </div>
        <span className="block mt-3">Skor: <span className="font-bold">{score}</span></span>
      </form>
      <Info />
    </main>
  );
}