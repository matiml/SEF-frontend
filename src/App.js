import React, { useState, useEffect, useCallback } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import './index.scss';

const path = process.env.REACT_APP_API_URL;

const socket = io(path); 

function App() {
  const [blockNav, setBlockNav] = useState(false);

  const emitAlert = useCallback(() => {
    socket.on("sellerDisconnected", (name) => {
        Swal.fire({ 
          text: `${name} se ha desconectado`, 
          icon: 'warning', 
          cancelButtonText: 'Ok'
        })
    })

    return () => {
      socket.off("sellerDisconnected")
    }
  }, [])

  useEffect(() => {
    emitAlert()
  }, [emitAlert])

  return (
    <div className="App">
      <Navbar blockNav={blockNav} />
      <SignIn setBlockNav={setBlockNav} />
    </div>
  );
}

export default App;
