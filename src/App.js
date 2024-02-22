import './App.css';
import Typewriter from "./Typewriter";
import React, { useState } from 'react';

function App() {
  // VARIABLES/SETTER FUNCTIONS
  const [Name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyProp, setTypewriterKey] = useState(0);

  // RESETS THE TYPEWRITER 
  const resetTypewriter = () => {
    setTypewriterKey(keyProp => keyProp + 1);
  };

  async function fetchName() {
    setLoading(true);
    try {
      let response = await fetch('http://cat.epicgamer.org:3000/word/adjective/');
      let data1 = await response.json();

      response = await fetch('http://cat.epicgamer.org:3000/word/noun/');
      let data2 = await response.json();

      setName(`DJ ${data1[0].word} ${data2[0].word}`);
      resetTypewriter();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }
  
  async function getRandomLine() {
    try {
      const response = await fetch('/djnames.txt');
      const text = await response.text();
      const lines = text.split(' ');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      setName(`DJ ${randomLine}`);
      resetTypewriter();
    } catch (error) {
      console.error('Error fetching the names file:', error);
      setError(error);
    }
  }

  // API CALL
  const buttonClick = () => {
    if (Math.random() < 0.5) {
      getRandomLine();
    }
    else {
      fetchName();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>YOUR DJ NAME IS: </p>
        <button onClick={buttonClick} disabled={loading}>GET ME A NAME</button>
        {error && <p>Error: {error.message}</p>}
        <h1>
          {Name}
          {/* Uncomment the Typewriter component when it's ready to be used */}
          {/* <Typewriter key={keyProp} text={Name} delay={100} /> */}
        </h1>
      </header>
    </div>
  );
}

export default App;
