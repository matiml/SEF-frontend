import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { socket, getSellers } from '../../services/whatsapp';
import ItemList from '../ItemList/ItemList';
import './SellerColumn.scss';

function SellerColumn({ setSelectedSeller, selectedSeller = {} }) {
    const queryClient = useQueryClient();

    const { data: sellerData } = useQuery(["sellers"], () => getSellers());

    useEffect(() => {
        socket.on("newSeller", () => {
            queryClient.refetchQueries(["sellers"], { active: true });
        });

        return () => socket.off("newSeller");
    }, [queryClient])

    return (
        <div className="seller">
            <h5>Vendedor</h5>
            {
                sellerData && sellerData.map(seller => {
                        return (
                            <ItemList
                                active={selectedSeller.number === seller.number ? true : false}
                                seller={seller}
                                selected={selectedSeller}
                                setSelectedSeller={setSelectedSeller}
                                key={seller.id}
                            >
                                {seller.name}
                            </ItemList>
                        )
                    })
            }
        </div>
    )
}

export default SellerColumn;