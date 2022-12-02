import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagesContainer from '../MessagesContainer/MessagesContainer.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import './Home.scss';

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const loggedUser = localStorage.getItem('loggedUser')

        if (!loggedUser) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <div className="home">
            <Navbar />
            <MessagesContainer />
        </div>
    )
}

export default Home;