import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

const path = process.env.REACT_APP_API_URL;

const socket = io(path);

function Steps() {
    const queryClient = useQueryClient();

    const getAllClients = async () => {
        const { data } = await axios.get(`${path}/vendedores/allClients`)
        return data
    }

    const { data: clients, isLoading, isSuccess } = useQuery(["allClients"], () => getAllClients()
        .then(clients => clients.map(client => {
            return {
                step: client.lastStep,
                name: client.name,
                number: client.number
            }
        })))

    useEffect(() => {
        socket.on("newSeller", () => {
            queryClient.refetchQueries(["allClients"], { active: true });
        });

        socket.on("newMessage", () => {
            queryClient.refetchQueries(["allClients"], { active: true });
        });

        return () => {
            socket.off("newSeller");
            socket.off("newMessage");
        }
    }, [queryClient])

    let pasos = [
        { text: 'Paso 1', step: 1 },
        { text: 'Paso 2', step: 2 },
        { text: 'Paso 3', step: 3 },
        { text: 'Paso 4', step: 4 },
        { text: 'Paso 5', step: 5 },
        { text: 'Paso 6', step: 6 },
        { text: 'Paso 7', step: 7 },
        { text: 'Paso 8', step: 8 },
        { text: 'Paso 9', step: 9 },
        { text: 'Paso 10', step: 10 }
    ]

    if (isLoading) return <h1>Cargando...</h1>
    if (isSuccess) return (
        <>
        <Link to='/'>Inicio</Link>
        <table style={{ width: '100%' }} cellSpacing="0" cellPadding="0" border="4">
            <caption>PASOS EN LOS QUE SE ENCUENTRA CADA CLIENTE</caption>
            <thead style={{ width: '100%' }}>
                <tr>
                    {pasos.map(paso => <th key={paso.step}>{paso.text}</th>)}
                </tr>
            </thead>
            <tbody align="center" bgcolor="#ff8800" valign="top">
                {
                    clients.map(client => {
                        return client.step > 0 && (
                            <tr key={client.number}>
                                {
                                    pasos.map(paso => {
                                        return (
                                            <td key={paso.step}>
                                                {
                                                    client.step === paso.step 
                                                    ? <div style={{backgroundColor: client.step > 9 && '#8dee1e', width: '100%', height: '100%'}}>
                                                        <p style={{fontSize: '14px', fontWeight: '700'}}>{client.name}</p>
                                                        <p style={{fontSize: '14px', fontWeight: '700'}}>{client.number}</p>
                                                      </div> 
                                                    : client.step < paso.step
                                                    ? <p style={{margin: '10px 0 0 0'}}>🕘</p> 
                                                    : <p style={{margin: '10px 0 0 0'}}>✔</p>    
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
}

export default Steps;