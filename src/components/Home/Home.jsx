import React from 'react';
import MessagesContainer from '../MessagesContainer/MessagesContainer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import './Home.scss';

function Home() {  
  return (
    <div className="home">        
        <Navbar />
        <MessagesContainer />
    </div>
  )
}

export default Home;