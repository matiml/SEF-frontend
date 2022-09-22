import React, { useState, useEffect } from 'react';
import ItemClient from '../ItemClient/ItemClient';

function ClientsColumn({ selectedSeller = {}, setSelectedClient, selectedClient = {}}) {
    const [clientData, setClientData] = useState([]);

    useEffect(() => {
        clientsFetch()
    }, [selectedSeller])

    const clientsFetch = async() => {
        // '/vendedores/${selectedSeller.id}/clientes'
        const response = await fetch(`http://localhost:4000/vendedores/${selectedSeller.number}/clientes`);
        const json = await response.json();
        console.log(response);
        console.log(json);
        setClientData(json);
    }

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