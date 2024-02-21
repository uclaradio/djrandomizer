import './App.css';
import Typewriter from "./Typewriter";

import React, { useState, useEffect } from 'react';

function App() {
  // VARIABLES/SETTER FUNCTIONS
  const [adj, setAdj] = useState("NAMEY");
  const [noun, setNoun] = useState("MCNAMEFACE");
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

  return (
    <div className="App">
      <header className="App-header">
        <p>YOUR DJ NAME IS: </p>
        <button onClick={buttonClick}>GET ME A NAME</button>
        {error && <p>Error: {error.message}</p>}
        {(
          <h1>
            {"DJ "}
            <Typewriter key={keyProp} text={`${adj} ${noun}`} delay={100} />
          </h1>
        )}
      </header>
    </div>
  );
}

export default App;