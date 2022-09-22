import React from 'react';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import './index.scss';


function App() {

  return (
    <div className="App">
      <Navbar />
      <SignIn  />
    </div>
  );
}

export default App;
