import React from 'react';

function ItemClient({ children, client = {}, setSelectedClient, selectedClient, active, newMessageNum, setNewMessageNum }) {

    const handleClick = () => {
        setSelectedClient(client);
        if (selectedClient.number === newMessageNum) setNewMessageNum({});
    }

    return (
        <div className={`item-list ${active && 'isActive'} ${newMessageNum !== selectedClient.number && newMessageNum === client.number && 'new'}`} onClick={handleClick} >
            <p className="item-name">{children}</p>
        </div>
    )
}

export default ItemClient;