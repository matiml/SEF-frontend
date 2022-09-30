import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ItemMessage from '../ItemMessage/ItemMessage';
import './MessagesColumn.scss';
import io from 'socket.io-client';

const socket = io('https://sef-production-a2d4.up.railway.app');

function MessagesColumn({ selectedClient = {}, selectedSeller = {} }) {
    const [messages, setMessages] = useState([]);

    const messagesFetch = useCallback(async () => {
        const response = await fetch(`https://sef-production-a2d4.up.railway.app/vendedores/${selectedClient.id}/mensajes`);
        const json = await response.json();
        setMessages(json);
    }, [selectedClient.id])

    useEffect(() => {
        messagesFetch()

        // para recibir mensajes en tiempo real
        socket.on("newMessage", () => {
            messagesFetch();
        });

        // ! limpiando el useEffect
        return () => socket.off("newMessage");
    }, [messagesFetch])

    // mostrar los mensajes en orden ascendente
    const reversedMessages = useCallback(() => Array.from(messages.reverse()),[messages]);

    return (
        <div className="messages">
            <h5>Mensajes</h5>
            <div className="chats">
                {
                    reversedMessages.map(message => {
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