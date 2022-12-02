import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import './Settings.scss';
import { Link } from 'react-router-dom';

function Settings() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="settings">
      <SettingsIcon className="config" onClick={() => setIsOpen(!isOpen)}/>
      <Link to="/settings"><AccountCircleIcon className={`hidden first ${isOpen && 'open'}`}/></Link>
      <Link to="/control"><BarChartIcon className={`hidden second ${isOpen && 'open'}`} /></Link>
    </div>
  )
}

export default Settings;