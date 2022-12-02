import React from 'react';
import './Preferences.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BotConfig from '../BotConfig/BotConfig';
import Account from '../Account/Account';

function Preferences() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('loggedUser');
    navigate('/login');
  }

  return (
    <div className="preferences">
        <div className="container">
            <div className="nav">
                <div className="links">
                    <Link to='/'><HomeRoundedIcon /></Link>
                    <Link to='/sessions'><MessageRoundedIcon /></Link>
                    <button onClick={logout}><LogoutRoundedIcon /></button>
                </div>
                <ul className="options">
                    <Link to='/settings'><li>Cuenta</li></Link>
                    <Link to='/settings/bot'><li>Bot</li></Link>
                </ul>
            </div>
            <div className="settings">
                {
                    location === '/settings' 
                    ? <><h1>Configuracion de la cuenta</h1><Account /></>
                    : location === '/settings/bot' && <><h1>Mensajes enviados por el bot</h1><BotConfig /></>
                }
            </div>
        </div>
    </div>
  )
}

export default Preferences;