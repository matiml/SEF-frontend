import React, { useEffect } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import './StepsControl.scss';

const path = process.env.REACT_APP_API_URL;

const socket = io(path);

function StepsControl() {
    const queryClient = useQueryClient();

    const getAllClients = async () => {
        const { data } = await axios.get(`${path}/vendedores/allClients`)
        return data
    }

    const { data: clients, isLoading, isSuccess, isError, error } = useQuery(["allClients"], () => getAllClients()
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

    if (isLoading) return (
        <div className="steps-table">
            <h1>Cargando...</h1>
        </div>
    )
    if (isError || error) return (
        <div className="steps-table">
            <Link to='/'><HomeRoundedIcon /></Link>
            <Link to='/sessions'><MessageRoundedIcon /></Link>
            <table cellSpacing="0" cellPadding="0" border="0">
                <caption>PASOS RECORRIDOS POR CLIENTE</caption>
                <thead>
                    <tr>
                        <h1>No se pudo obtener la informacion</h1>
                    </tr>
                </thead>
            </table>
        </div>
    )

    if (isSuccess) return (
        <div className="steps-table">
            <Link to='/'><HomeRoundedIcon /></Link>
            <Link to='/sessions'><MessageRoundedIcon /></Link>
            <table cellSpacing="0" cellPadding="0" border="0">
                <caption>PASOS RECORRIDOS POR CLIENTE</caption>
                <thead>
                    <tr>
                        {pasos.map(paso => <th key={paso.step}>{paso.text}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {
                        clients.map(client => {
                            return client.step > 0 && (
                                <tr key={client.number} style={{ backgroundColor: '#5cb85caa', color: '#fff'}}>
                                    {
                                        pasos.map(paso => {
                                            return (
                                                <td key={paso.step}>
                                                    {
                                                        client.step === paso.step
                                                            ? <>
                                                                <p>{client.name}</p>
                                                                <p>{client.number}</p>
                                                            </>
                                                            : client.step < paso.step
                                                                ? <p>🕘</p>
                                                                : <p>✔</p>
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
        </div>
    )
}

export default StepsControl;