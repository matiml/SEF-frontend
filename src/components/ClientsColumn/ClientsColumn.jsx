import React, { useState, useEffect, useCallback } from 'react';
import ItemClient from '../ItemClient/ItemClient';

function ClientsColumn({ selectedSeller = {}, setSelectedClient, selectedClient = {} }) {
    const [clientData, setClientData] = useState([]);

    const clientsFetch = useCallback(async () => {
        const response = await fetch(`https://sef-production-a2d4.up.railway.app/vendedores/${selectedSeller.number}/clientes`);
        const json = await response.json();
        setClientData(json);
    }, [selectedSeller.number])

    useEffect(() => {
        clientsFetch()
    }, [clientsFetch])

    return (
        <div className="client">
            <h5>Clientes</h5>
            {
                clientData.map((client, index) => {
                    return (
                        selectedSeller.number === client.vendedorNumber
                            ? (<ItemClient
                                active={selectedClient.number === client.number ? true : false} /* !!! */
                                client={client}
                                selectedClient={selectedClient}
                                setSelectedClient={setSelectedClient}
                                key={client.id}
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