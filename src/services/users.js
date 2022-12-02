import axios from 'axios';
import Swal from 'sweetalert2';

const path = process.env.REACT_APP_API_URL;

export const createUser = async (newUser) => {
    await axios.post(`${path}/signUp`, newUser)
        .then(res => {
            console.log(res)
            if (!res.data.error) { 
                Swal.fire({ 
                    text: `Usuario: ${res.data.name} creado correctamente`, 
                    icon: 'success', 
                }).then(() => {
                    setTimeout(() => {
                        window.location.href = '/login'
                    }, 1000)
                })
            } else {
                Swal.fire({
                    title: 'Error al crear usuario',
                    text: 'Por favor, revise todos los campos y vuelva a intentarlo',
                    icon: 'warning',
                    cancelButtonText: 'Reintentar'
                })
            };
        })
        .catch(e => console.log(e))
}

export const authorizeUser = async (user) => {
    await axios.post(`${path}/auth`, user)
    .then(res => console.log(res))
    .catch(e => console.log(e))
}