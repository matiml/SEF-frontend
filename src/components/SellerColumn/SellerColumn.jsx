import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';
import ItemList from '../ItemList/ItemList';
import './SellerColumn.scss';

const path = process.env.REACT_APP_API_URL;

const socket = io(path);

function SellerColumn({ setSelectedSeller, selectedSeller = {} }) {
    const queryClient = useQueryClient();

    const getClients = async () => {
        const { data } = await axios.get(path + '/vendedores');
        return data;
    }

    const { data: sellerData } = useQuery(["sellers"], () => getClients())

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