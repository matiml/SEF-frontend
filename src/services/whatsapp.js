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
    try {
        const { data } = await axios.get(path + '/vendedores', config);
        setData(data);
        return data;
    } catch (e) {
        console.error(`Error en fetch getSellers: ${e.message}`);
        return []; // !!
    }
}

export const getClients = async (sellerNum) => {
    try {
        const { data } = await axios.get(path + `/vendedores/${sellerNum}/clientes`, config);
        return data;
    } catch (e) {
        console.error(`Error en fetch getClients: ${e.message}`);
        return [];
    }
}

export const getMessages = async (clientID) => {
    try {
        const { data } = await axios.get(path + `/vendedores/${clientID}/mensajes`, config);
        return data;
    } catch (e) {
        console.error(`Error en fetch getClients: ${e.message}`);
        return [];
    }
}

export const getAllClients = async () => {
    try {
        const { data } = await axios.get(`${path}/vendedores/allClients`, config)
        return data
    } catch (e) {
        console.error(`Error en fetch getClients: ${e.message}`);
        return [];
    }
}