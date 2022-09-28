import React, { useState, useEffect } from 'react';
import ItemMessage from '../ItemMessage/ItemMessage';
// import './MessagesColumn.scss';
import io from 'socket.io-client';

const socket = io('https://sef-production-a2d4.up.railway.app')

function MessagesColumn({ selectedClient = {}, selectedSeller = {} }) {
  const [messages, setMessages] = useState([]);

    useEffect(() => {
        mensajesFetch()
    }, [selectedClient])

    const mensajesFetch = async() => {
        // '/vendedores/${selectedClient.id}/mensajes'
        const response = await fetch(`https://sef-production-a2d4.up.railway.app/vendedores/${selectedClient.id}/mensajes`);
        const json = await response.json();
        setMessages(json);
    }

      socket.on("newMessage", () => {
            console.log('hola')
            mensajesFetch()
        });
    


  return (
    <div className="messages">
        <h5>Mensajes</h5>
        <div className="chats">
          {
            messages.map(message => {
              return (
                message.clienteId === selectedClient.id && selectedClient.vendedorNumber === selectedSeller.number
                ? (<ItemMessage 
                  key={message.id} 
                  sellerName={selectedSeller.name}
                  clientName={selectedClient.name}
                  message={message.body} 
                  fromMe={message.fromMe} 
                  date={message.date} 
                />)
                : null
              )
            })
          }
        </div>
    </div>
  )
}

export default MessagesColumn;