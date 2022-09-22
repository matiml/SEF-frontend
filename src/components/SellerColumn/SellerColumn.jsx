import React, { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import Loader from '../Loader/Loader';
import './SellerColumn.scss';

function SellerColumn({ setSelectedSeller, selectedSeller = {}}) {
    const [sellerData, setSellerData] = useState([]);
    const [fetchingData, setFetchingData] = useState(true);

    useEffect(() => {
        sellersFetch()
    }, [])

    const sellersFetch = async() => {
        // '/vendedores'
        const response = await fetch('http://localhost:4000/vendedores');
        const json = await response.json();
        setSellerData(json);
        setFetchingData(false);
    }

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
            : <Loader />
        }
    </div>
  )
}

export default SellerColumn;