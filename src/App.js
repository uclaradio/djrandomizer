import './App.css';
// Make sure the import path matches the location of radioblack.png
import radioBlack from './images/radioblack.png';
import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState("Click on the button to generate your DJ Name!");
  const user = "DJ ";

  const generateRandomName = () => {
    // Generate a random number and use it as part of the name
    const randomNumber = Math.floor(Math.random() * 100); // Example: Generate a number between 0 and 99
    const randomName = `${user}${randomNumber}`; // Concatenate 'user_' with the random number
    setName(randomName);
  };

  return (
    <><div className="App">
      <div>
        <button onClick={generateRandomName}>Generate DJ Name</button>
        <p>{name}</p> {/* Display the generated name */}
      </div>
    </div><div className="App">
        <header className="App-header">
          <img src={radioBlack} className="App-logo" alt="Radio Black" />


        </header>
      </div></>
  );

};


// function App() {
//   return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={radioBlack} className="App-logo" alt="Radio Black" />
        
        
    //   </header>
    // </div>
//   );
// }

export default App;
