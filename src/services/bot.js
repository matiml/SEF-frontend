import axios from 'axios';
import Swal from 'sweetalert2';

const path = process.env.REACT_APP_API_URL;

const user = localStorage.getItem('loggedUser');
const userJSON = JSON.parse(user);

const config = {
    headers: {
        Authorization: `Bearer ${userJSON?.token}`
    },
}

export const getSteps = async () => {
    try {
        const { data } = await axios.get(`${path}/form`);    
        return data.stepsDB;
    } catch (e) {
        console.error(`Error en fetch getSteps: ${e.message}`)
        return []
    }
}

export const createSteps = async (steps) => {
    try {
        await axios.patch(`${path}/form/update`, steps, config)
        Swal.fire({
            text: `Informacion guardada correctamente`,
            icon: 'success',
            cancelButtonText: 'Ok'
        })
    } catch(e) {
        console.error(`Error creando steps: ${e.message}`);
        Swal.fire({
            text: `No se pudo guardar la informacion`,
            icon: 'warning',
            cancelButtonText: 'Cerrar'
        })
    }
}

