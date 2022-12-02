import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import ItemMessage from '../ItemMessage/ItemMessage';
import { socket, getMessages } from '../../services/whatsapp';

function MessagesColumn({ selectedClient = {}, selectedSeller = {} }) {
    const queryClient = useQueryClient();

    const { data: messages } = useQuery(["messages", selectedClient.id], () => getMessages(selectedClient.id));

    useEffect(() => {
        socket.on("newMessage", () => {
            queryClient.refetchQueries(["messages"], { active: true });
        });

        return () => socket.off("newMessage");
    }, [queryClient])

    const scrollBottom = () => {
        let body = document.querySelector(".messages");
        let height = body.scrollHeight
        body.scrollTo(0, height)
    }
    
    useEffect(() => {
        scrollBottom(); // ?? ⬆ ⬆ ⬆ ⬆ 👆
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