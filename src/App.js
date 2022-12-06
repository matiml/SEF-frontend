import React, { useState, useEffect, useCallback } from 'react';
import './index.scss';
import SignIn from './components/SignIn/SignIn';
import Navbar from './components/Navbar/Navbar';
import Swal from 'sweetalert2';
import Settings from './components/Settings/Settings';
import { socket } from './services/whatsapp';

function App() {
  const [blockNav, setBlockNav] = useState(false);

  const [isLogged, setIsLogged] = useState();

  const emitAlert = useCallback(() => { // deberia usar useMemo pero no funciona como se espera
      socket.on("connect_error", (error) => {
        console.error(`Error conectando al socket: ${error.message}`);
      });

      socket.on("sellerDisconnected", (name) => {
        Swal.fire({ 
          text: `${name} se ha desconectado`, 
          icon: 'warning', 
          cancelButtonText: 'Ok'
        })
      })

      return () => {
        socket.off("connect_error");
        socket.off("sellerDisconnected");
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
