import React from 'react';
import './ItemList.scss';

function ItemList({ children, seller, setSelectedSeller, active }) {
    const handleClick = () => {
        setSelectedSeller(seller);
    }

    return (
        <div className={`item-list ${active ? 'isActive' : ''}`} onClick={handleClick}>
            <p className="item-name">{children}</p>
        </div>
    )
}

export default ItemList;