import React, { useEffect, useState } from 'react';
import ItemClient from '../ItemClient/ItemClient';
import io from 'socket.io-client';
import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const socket = io('https://sef-production-a2d4.up.railway.app');

function ClientsColumn({ selectedSeller = {}, setSelectedClient, selectedClient = {} }) {
    const queryClient = useQueryClient();
    const [newMessageNum, setNewMessageNum] = useState({});

    const getClients = async (sellerNum) => {
        const { data } = await axios.get(`https://sef-production-a2d4.up.railway.app/vendedores/${sellerNum}/clientes`);
        return data;
    }

    const { data: clientData } = useQuery(["clients", selectedSeller.number], () => getClients(selectedSeller.number))

    useEffect(() => {
        socket.on("newMessage", (msg) => {
            queryClient.refetchQueries(["clients"], { active: true });
            if (msg.fromMe !== true) {
                setNewMessageNum(msg.id.remote.split('@')[0]);
            }
        });

        return () => socket.off("newMessage");
    }, [queryClient, clientData])

    return (
        <div className="client">
            <h5>Clientes</h5>
            {clientData &&
                clientData.map(client => {
                    return (
                        selectedSeller.number === client.vendedorNumber
                            ? (<ItemClient
                                active={selectedClient.number === client.number} /* !!! */
                                client={client}
                                selectedClient={selectedClient}
                                setSelectedClient={setSelectedClient}
                                key={client.id}
                                newMessageNum={newMessageNum}
                                setNewMessageNum={setNewMessageNum}
                            >
                                {client.name}
                            </ItemClient>)
                            : null
                    )
                })
            }
        </div>
    )
}

export default ClientsColumn;