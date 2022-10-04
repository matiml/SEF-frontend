import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import ItemMessage from '../ItemMessage/ItemMessage';
import './MessagesColumn.scss';
import io from 'socket.io-client';

const socket = io('https://sef-production-a2d4.up.railway.app');

function MessagesColumn({ selectedClient = {}, selectedSeller = {} }) {
    const queryClient = useQueryClient();

    const getMessages = async (clientID) => {
        const { data } = await axios.get(`https://sef-production-a2d4.up.railway.app/vendedores/${clientID}/mensajes`);
        const reversedMessages = Array.from(data.reverse());
        return reversedMessages;
    }

    const {data: messages} = useQuery(["messages", selectedClient.id], () => getMessages(selectedClient.id))

    useEffect(() => {
        socket.on("newMessage", () => {
            queryClient.refetchQueries(["messages"], { active: true });
        });

        // ! limpiando el useEffect
        return () => socket.off("newMessage");
    }, [queryClient])

    return (
        <div className="messages">
            <h5>Mensajes</h5>
            <div className="chats">
                {messages &&
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