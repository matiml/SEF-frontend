import React, { useState, useEffect, useCallback } from 'react';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';
import './SellerColumn.scss';

function SellerColumn({ setSelectedSeller, selectedSeller = {} }) {
    const [sellerData, setSellerData] = useState([]);
    const [fetchingData, setFetchingData] = useState(true);

    const sellersFetch = useCallback(async () => {
        const response = await fetch('https://sef-production-a2d4.up.railway.app/vendedores');
        const json = await response.json();
        setSellerData(json);
        setFetchingData(false);
    }, [])

    useEffect(() => {
        sellersFetch()
    }, [sellersFetch])


    return (
        <div className="seller">
            <h5>Vendedor</h5>
            {
                !fetchingData
                    ? (sellerData.map(seller => {
                        return (
                            <ItemList
                                active={selectedSeller.number === seller.number ? true : false}
                                seller={seller}
                                setSelectedSeller={setSelectedSeller}
                                key={seller.id}
                            >
                                {seller.name}
                            </ItemList>
                        )
                    }))
                    : <Loader model='basic' />
            }
        </div>
    )
}

export default SellerColumn;