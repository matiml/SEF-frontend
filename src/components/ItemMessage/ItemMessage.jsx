import React from 'react';

function ItemMessage({ message = '', fromMe, date = '', clientName = '', sellerName = '', mediaData, mediaType, mediaExtension }) {
    const dateArg = new Date(date).toLocaleString("es-AR", { timeZone: "America/Buenos_Aires" });

    let hour = dateArg.slice(11, 17);

    if (hour[0] === ' ') {
        hour = dateArg.slice(12, 17);
    }

    if (hour[5] === ':') {
        hour = dateArg.slice(11, 16);
    }

    // ** mediaExtension = `data:image/${mediaExtension};base64...`

    if (mediaType === 'image') {
        return (
            <div className={`msg ${fromMe ? 'from-me' : ''}`}>
                <img style={{ width: '300px' }} loading="lazy" src={'data:image/png;base64,' + mediaData} alt="some img" />
                <p>{message || ''}</p> {/* !!! REVISAR IMAGENES CON TEXTO */}
                <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
            </div>
        )
    }

    if (mediaType === 'ptt') {
        return (
            <div className={`msg ${fromMe ? 'from-me' : ''}`}>
                <audio controls autoplay src={"data:audio/ogg;base64," + mediaData} />
                <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
            </div>
        )
    }

    if (mediaType === 'sticker') {
        return (
            <div className={`msg ${fromMe ? 'from-me' : ''}`}>
                <picture>
                    <source srcset={"data:image/webp;base64," + mediaData} type="image/webp" />
                    <img src={"data:image/webp;base64," + mediaData} alt='sticker' />
                </picture>
                <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
            </div>
        )
    }

    if (mediaType === 'video') {
        return (
            <div className={`msg ${fromMe ? 'from-me' : ''}`}>
                <video controls src={"data:video/mp4;base64," + mediaData} width="400px" />
                <p>{message || ''}</p> {/* !!! REVISAR VIDEOS CON TEXTO */}
                <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
            </div>
        )
    }

    return (
        <div className={`msg ${fromMe ? 'from-me' : ''}`}>
            <p>{message}</p>
            <div><span>{fromMe ? sellerName : clientName}</span><span className="hour">{hour}</span></div>
        </div>
    )
}

export default ItemMessage;