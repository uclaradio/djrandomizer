import './App.css';
// Make sure the import path matches the location of radioblack.png
import radioBlack from './images/radioblack.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={radioBlack} className="App-logo" alt="Radio Black" />
        Hi - Scott
        
      </header>
    </div>
  );
}

export default App;
