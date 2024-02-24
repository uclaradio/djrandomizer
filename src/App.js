import './App.css';
import radioBlack from "./radioblack.png"; // Import the radio logo
import React, { useState } from 'react';

function App() {
  // VARIABLES/SETTER FUNCTIONS
  const [Name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchName() {
    setLoading(true);
    try {
      let response = await fetch('http://cat.epicgamer.org:3000/word/adjective/');
      let data1 = await response.json();

      response = await fetch('http://cat.epicgamer.org:3000/word/noun/');
      let data2 = await response.json();

      setName(`DJ ${data1[0].word} ${data2[0].word}`);
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

  const buttonStyle = {
    backgroundColor: '#f5b3f1', // pink background
    border: 'none',
    color: 'dark gray',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px', // Rounded corners
  };  

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <h1 className="App-title">DJ Name Generator<span className="underline"></span></h1>
        </div>

        {<img src={radioBlack} className="App-logo" alt="Radio Black" />}
        <p>YOUR DJ NAME IS: </p>
        <button onClick={buttonClick} disabled={loading} style={buttonStyle}>{loading ? 'Loading...' : 'GET ME A NAME'}</button>
        {error && <p>Error: {error.message}</p>}
        <h1>
          {Name}
        </h1>
      </header>
    </div>
  );
}


export default App;
