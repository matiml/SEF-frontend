import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import ItemMessage from '../ItemMessage/ItemMessage';
import io from 'socket.io-client';

const path = process.env.REACT_APP_API_URL;

const socket = io(path);

function MessagesColumn({ selectedClient = {}, selectedSeller = {} }) {
    const queryClient = useQueryClient();

    const getMessages = async (clientID) => {
        const { data } = await axios.get(path + `/vendedores/${clientID}/mensajes`);
        //const reversedMessages = Array.from(data.reverse());
        return data;
    }

    const { data: messages } = useQuery(["messages", selectedClient.id], () => getMessages(selectedClient.id))

    useEffect(() => {
        socket.on("newMessage", () => {
            queryClient.refetchQueries(["messages"], { active: true });
        });

        return () => socket.off("newMessage");
    }, [queryClient])

    useEffect(() => {
        let body = document.querySelector(".messages");
        let height = body.scrollHeight
        body.scrollTo(0, height)
    }, [messages])

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
                                    mediaData={message.media}
                                    mediaType={message.type}
                                    mediaExtension={message.typeExtension}
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