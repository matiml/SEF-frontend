import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';
import ItemList from '../ItemList/ItemList';
import './SellerColumn.scss';

const IP = process.env.IP || 'https://sef-production-a2d4.up.railway.app';

//const socket = io(IP)
const socket = io('https://sef-production-a2d4.up.railway.app');

function SellerColumn({ setSelectedSeller, selectedSeller = {} }) {
    const queryClient = useQueryClient();

    const getClients = async () => {
        // const { data } = await axios.get("http://18.228.7.166:3002/vendedores")
        const { data } = await axios.get(`https://sef-production-a2d4.up.railway.app/vendedores`);
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