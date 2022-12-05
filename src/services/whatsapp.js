import axios from 'axios';
import io from 'socket.io-client';

const path = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const config = {
    headers: {
        api: apiKey,
    }
}

export const socket = io(path);

export const getSellers = async (setData = () => {}) => {
    const { data } = await axios.get(path + '/vendedores', config);
    setData(data);
    return data;
}

export const getClients = async (sellerNum) => {
    const { data } = await axios.get(path + `/vendedores/${sellerNum}/clientes`, config);
    return data;
}

export const getMessages = async (clientID) => {
    const { data } = await axios.get(path + `/vendedores/${clientID}/mensajes`, config);
    return data;
}

export const getAllClients = async () => {
    const { data } = await axios.get(`${path}/vendedores/allClients`, config)
    return data
}