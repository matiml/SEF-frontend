import axios from 'axios';
import Swal from 'sweetalert2';

const path = process.env.REACT_APP_API_URL;

const user = localStorage.getItem('loggedUser');
const userJSON = JSON.parse(user);

const config = {
    headers: {
        Authorization: `Bearer ${userJSON.token}`
    },
}

export const getSteps = async () => {
    const { data } = await axios.get(`${path}/form`);    
    console.log(data.stepsDB);
    return data.stepsDB;
}

export const createSteps = async (steps) => {
    await axios.patch(`${path}/form/update`, steps, config)
        .then(() => {
            Swal.fire({
                text: `Informacion guardada correctamente`,
                icon: 'success',
                cancelButtonText: 'Ok'
            })
        })
        .catch(e => {
            console.log(e)
            Swal.fire({
                text: `No se pudo guardar la informacion`,
                icon: 'warning',
                cancelButtonText: 'Cerrar'
            })
        })
}

