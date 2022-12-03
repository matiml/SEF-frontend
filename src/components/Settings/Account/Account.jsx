import React from 'react';
import './Account.scss';

function Account() {

  return (
    <form className='cambiar-form'>
      <h3>Cambiar contraseña</h3>
      <div className="inputs">
        <input type="email" placeholder="Correo electronico" name="email" />
        <input type="password" placeholder="Contraseña anterior" name="anterior" />
        <input type="password" placeholder="Contraseña nueva" name="nueva" />
      </div>
      <button className="cambiar" type="submit">Modificar</button>
    </form>
  )
}

export default Account;