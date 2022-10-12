import React, { useState, useEffect, useCallback } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import './index.scss';

//const socket = io("http://18.228.7.166:3002");
const socket = io('https://sef-production-a2d4.up.railway.app'); 

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
