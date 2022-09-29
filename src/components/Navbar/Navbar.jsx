import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
    return (
        <div className="navbar">
            <NavLink to="/">
                Iniciar nueva sesión
            </NavLink>
            <NavLink to="/sessions">
                Sesiones activas
            </NavLink>
        </div>
    )
}

export default Navbar;