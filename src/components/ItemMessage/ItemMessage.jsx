import React from 'react';

function ItemMessage({ message = '', fromMe, date = '', clientName = '', sellerName = '' }) {
    const dateArg = new Date(date).toLocaleString("es-AR", { timeZone: "America/Buenos_Aires" })
    const hour = dateArg.slice(11, 16);


    return (
        <div className={`msg ${fromMe ? 'from-me' : ''}`}>
            <p>{message}</p>
            <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
        </div>
    )
}

export default ItemMessage;