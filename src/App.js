import './App.css';
import Typewriter from "./Typewriter";
import radioBlack from './images/radioblack.png'; // Import the radio logo
import React, { useState, useEffect } from 'react';

function App() {
  // VARIABLES/SETTER FUNCTIONS
  const [adj, setAdj] = useState("");
  const [noun, setNoun] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyProp, setTypewriterKey] = useState(0);

  //RESETS THE TYPEWRITER 
  const resetTypewriter = () => {
    setTypewriterKey(keyProp => keyProp + 1);
  };

  function fetchName() {
    //HOSTING THIS ON AN AWS LIGHSTAIL INSTANCE: https://github.com/mcnaveen/Random-Words-API
    fetch('http://35.89.90.194:3000/word/adjective/')
      .then(response => response.json())
      .then(data1 => {
        setAdj(data1[0].word);
        return fetch('http://35.89.90.194:3000/word/noun/');
      })
      .then(response => response.json())
      .then(data2 => {
        setNoun(data2[0].word);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }

  //API CALL AND TYPEWRITER REMOUNT
  const buttonClick = () => {
    fetchName();
    resetTypewriter();
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

        {/* <img src={radioBlack} className="App-logo" alt="Radio Black" /> Logo added */}
        <p>YOUR DJ NAME IS: </p>
        <button onClick={buttonClick} disabled={loading} style={buttonStyle}>{loading ? 'Loading...' : 'GET ME A NAME'}</button>
        {error && <p>Error: {error.message}</p>}
        <h1>
          {`DJ ${adj} ${noun}`}
          {/* You can uncomment the Typewriter component and use it once you ensure it's implemented correctly */}
          {/*<Typewriter key={keyProp} text={`${adj} ${noun}`} delay={100} />*/}
        </h1>
      </header>
    </div>
  );
}

export default App;