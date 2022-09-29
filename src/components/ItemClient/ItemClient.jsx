import React from 'react';

function ItemClient({ children, client = {}, setSelectedClient, active }) {

    const handleClick = () => {
        setSelectedClient(client);
    }

    return (
        <div className={`item-list ${active ? 'isActive' : ''}`} onClick={handleClick} >
            <p className="item-name">{children}</p>
        </div>
    )
}

export default ItemClient;