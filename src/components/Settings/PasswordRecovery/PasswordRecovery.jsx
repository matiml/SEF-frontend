import React from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordRecovery } from '../../../services/users';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import './PasswordRecovery.scss';

function PasswordRecovery() {
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUserPassword = {
      email: data.get('email'),
      password: data.get('password'),
      role: data.get('role')
    }
    passwordRecovery(newUserPassword, navigate);
    event.currentTarget.reset();
  };

  return (
    <form className='cambiar-form' onSubmit={handleSubmit}>
     <a href='/login'><KeyboardBackspaceIcon /><span>Regresar</span></a>
      <h3>Cambiar contraseña</h3>
      <div className="inputs">
        <input type="email" placeholder="Correo electronico" name="email" />
        <input type="password" placeholder="Contraseña nueva" name="password" />
        <input type="text" placeholder="Llave de autorizacion" name="role" />
      </div>
      <button className="cambiar" type="submit">Modificar</button>
    </form>
  )
}

export default PasswordRecovery;