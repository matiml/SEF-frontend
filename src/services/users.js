import axios from 'axios';
import Swal from 'sweetalert2';

const path = process.env.REACT_APP_API_URL;

export const createUser = async (newUser, navigate) => {
    await axios.post(`${path}/signUp`, newUser)
        .then(res => {
            console.log(res)
            if (!res.data.error) {
                Swal.fire({
                    text: `Usuario: ${res.data.name} creado correctamente`,
                    icon: 'success',
                }).then(() => {
                    setTimeout(() => {
                        navigate('/login')
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

export const authorizeUser = async (user, navigate) => {
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
                    navigate('/sessions')
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

export const passwordRecovery = async (userBody, navigate) => {
    await axios.post(`${path}/RecoveryPassword`, userBody)
        .then(res => {
            console.log(res);
            Swal.fire({
                text: 'Contraseña modificada correctamente',
                icon: 'success',
                cancelButtonText: 'Reintentar'
            })

            setTimeout(() => {
                navigate('/login')
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
    if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('loggedUser');
    }
    
    /* 
        // Make an HTTP request to the server to log out the user
        await axios.post('/logout');
    */

    navigate('/login');
}

/* 
Chat GPT recomendaciones:

export const createUser = async (newUser) => {
    try {
        await axios.post(`${path}/signUp`, newUser);
        Swal.fire({
            text: `Usuario: ${res.data.name} creado correctamente`,
            icon: 'success',
        });
        setTimeout(() => {
            window.location.href = '/login';
        }, 900);
    } catch (e) {
        console.error(`Error creando usuario: ${e.message}`);
        Swal.fire({
            title: 'Error al crear usuario',
            text: 'Por favor, revise todos los campos y vuelva a intentarlo',
            icon: 'warning',
            cancelButtonText: 'Reintentar'
        });
    }
}

export const authorizeUser = async (user) => {
    try {
        const res = await axios.post(`${path}/auth`, user);
        if (res.data.token && res.status === 200) {
            const loggedUser = {
                email: res.data.user.email,
                role: res.data.user.role,
                token: res.data.token
            };
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            setTimeout(() => {
                window.location.href = '/sessions';
            }, 700);
        }
    } catch (e) {
        console.error(`Usuario no autorizado: ${e.message}`);
        Swal.fire({
            title: 'Error al autorizar usuario',
            text: 'Por favor, revise todos los campos y vuelva a intentarlo',
            icon: 'warning',
            cancelButtonText: 'Reintentar'
        });
    }
} 

export const passwordRecovery = async (userBody) => {
    axios
        .post(`${path}/RecoveryPassword`, userBody)
        .then(res => {
            // Check the status code of the response
            if (res.status === 200) {
                // If the password recovery was successful, show a success message and redirect to the login page
                showSuccessAlert('Contraseña modificada correctamente');
                window.location.href = '/login';
            } else {
                // If the password recovery was not successful, show an error message
                showErrorAlert('Error al modificar la contraseña. Por favor, vuelva a intentarlo.');
            }
        })
        .catch(() => {
            // If the request failed, show an error message
            showErrorAlert('Error al enviar la solicitud de recuperación de contraseña. Por favor, vuelva a intentarlo.');
        });
}

const showSuccessAlert = (message) => {
    Swal.fire({
        text: message,
        icon: 'success',
        cancelButtonText: 'Reintentar',
    });
}

const showErrorAlert = (message) => {
    Swal.fire({
        title: 'Error',
        text: message,
        icon: 'warning',
        cancelButtonText: 'Reintentar',
    });
}
*/