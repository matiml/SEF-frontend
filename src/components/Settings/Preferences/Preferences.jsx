import React from 'react';
import './Preferences.scss';
import { Link, useNavigate } from 'react-router-dom';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BotConfig from '../BotConfig/BotConfig';
import { logout } from '../../../services/users';

function Preferences() {
  const navigate = useNavigate();

  return (
    <div className="preferences">
        <div className="container">
            <div className="nav">
                <div className="links">
                    <Link to='/'><HomeRoundedIcon /></Link>
                    <Link to='/sessions'><MessageRoundedIcon /></Link>
                    <button onClick={() => logout(navigate)}><LogoutRoundedIcon /></button>
                </div>
                <ul className="options">
                    <Link to='/settings/bot'><li>Bot</li></Link>
                </ul>
            </div>
            <div className="settings">
                <h1>Mensajes enviados por el bot</h1>
                <BotConfig />
            </div>
        </div>
    </div>
  )
}

export default Preferences;