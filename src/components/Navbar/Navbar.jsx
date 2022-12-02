import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ blockNav }) {
    return (
        <div className="navbar">
            <NavLink to="/">
                Iniciar nueva sesión
            </NavLink>
            <NavLink className={`${blockNav && 'bloqued'}`} to={`${blockNav ? '/' : '/sessions'}`}>
                Sesiones activas
            </NavLink>
        </div>
    )
}

export default Navbar;