import React from 'react';
import './Loader.scss';

function Loader({ model }) {

    switch (model) {
        case 'basic':
            return (
                <div className="loader"></div>
            );
        case 'qr':
            return (
                <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            );
        case 'signal':
            return (
                <div className="lds-ripple"><div></div><div></div></div>
            );
        default:
            return (
                <h4>Cargando</h4>
            )
    }
}

export default Loader;