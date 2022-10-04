import React, { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import './index.scss';


function App() {
  const [blockNav, setBlockNav] = useState(false);

  return (
    <div className="App">
      <Navbar blockNav={blockNav} />
      <SignIn setBlockNav={setBlockNav} />
    </div>
  );
}

export default App;
