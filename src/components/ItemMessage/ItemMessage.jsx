import React from 'react';

function ItemMessage({ message = '', fromMe, date = '', clientName = '', sellerName = '', base64 }) {
    const dateArg = new Date(date).toLocaleString("es-AR", { timeZone: "America/Buenos_Aires" })
    let hour = dateArg.slice(11, 17);

    if(hour[0] === ' ') {
        hour = dateArg.slice(12,17);
    }

    if(hour[5] === ':') {
        hour = dateArg.slice(11,16);
    }

    /* if (base64 !== '') {
    return (
        <div className={`msg ${fromMe ? 'from-me' : ''}`}>
            <img style={{width: '300px'}} src={'data:image/png;base64,' + base64} alt="some img" />
            <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
        </div>
    )     
    } */

    return (
        <div className={`msg ${fromMe ? 'from-me' : ''}`}>
            <p>{message}</p>
            <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
        </div>
    )
}

export default ItemMessage;