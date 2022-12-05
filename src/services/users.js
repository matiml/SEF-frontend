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
                    }, 900)
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
    .then(res => {
        const loggedUser = {
            email: res.data.user.email,
            role: res.data.user.role,
            token: res.data.token
        }

        if (res.data.token && res.status === 200) {
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            console.log('Autorizado')
            
            setTimeout(() => {
                window.location.href = '/sessions'
            }, 700)
            }
    })
    .catch(e => {
        console.error('No autorizado: ' + e)
        Swal.fire({
            title: 'Error',
            text: 'Por favor, revise todos los campos y vuelva a intentarlo',
            icon: 'warning',
            cancelButtonText: 'Reintentar'
        })
    })
}

export const passwordRecovery = async (userBody) => {
    await axios.post(`${path}/RecoveryPassword`, userBody)
    .then(res => {
        console.log(res);
        Swal.fire({
            text: 'Contraseña modificada correctamente',
            icon: 'success',
            cancelButtonText: 'Reintentar'
        })
        
        setTimeout(() => {
            window.location.href = '/login'
        }, 500)
    })
    .catch(e => {
        console.log(e);
        Swal.fire({
            title: 'Error',
            text: 'Por favor, revise todos los campos y vuelva a intentarlo',
            icon: 'warning',
            cancelButtonText: 'Reintentar'
        })
    })
}

export const logout = (navigate) => {
    localStorage.removeItem('loggedUser');
    navigate('/login');
}