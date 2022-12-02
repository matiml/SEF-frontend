import React, { useState, useEffect, useCallback } from 'react';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import Swal from 'sweetalert2';
import io from 'socket.io-client';
import './index.scss';
import Settings from './components/Settings/Settings';

const path = process.env.REACT_APP_API_URL;

const socket = io(path); 

function App() {
  const [blockNav, setBlockNav] = useState(false);

  const [isLogged, setIsLogged] = useState();

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

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    loggedUser ? setIsLogged(true) : setIsLogged(false)
  }, [])

  return (
    <div className="App">
      <Navbar blockNav={blockNav} />
      <SignIn setBlockNav={setBlockNav} />
      {
        isLogged && <Settings />
      }
    </div>
  );
}

export default App;
