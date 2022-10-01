import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../Loader/Loader';
import './SignIn.scss';
import QRCode from "react-qr-code";
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://sef-production-a2d4.up.railway.app')

function SignIn() {
	const [sellers, setSellers] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [newSellerName, setNewSellerName] = useState('');
	const [nameError, setNameError] = useState();
	const [exists, setExists] = useState();
	const [QR, setQR] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [valueQR, setValueQR] = useState('');

	const addNewSession = useCallback(() => {
		setExists(sellers.includes(newSellerName));

		if (newSellerName && !exists) {
			socket.emit("newSeller", newSellerName)
			setIsLoading(true);
			socket.on("qrNew", (qr) => {
				setValueQR(qr);
				setQR(true);
				setIsLoading(false);
			})
		}

		return () => socket.off("qrNew");
	}, [exists, newSellerName, sellers])

	useEffect(() => {
		addNewSession();
	}, [addNewSession])

	const handleChange = e => { // cuando esta escribiendo
		setInputValue(e.target.value);
	}

	const handleClick = e => { // cuando hace click en nueva sesion		
		e.preventDefault();
		setNameError(false);

		if (inputValue.length > 2) {
			setNewSellerName(inputValue);
		} else {
			setNameError(true);
		}
	}

	// FETCH VENDEDORES PARA VERIFICAR QUE NO HAYAN SESIONES REPETIDAS  
	useEffect(() => {
		sellersFetch();
	}, []);

	const sellersFetch = async () => {
		const { data } = await axios.get('https://sef-production-a2d4.up.railway.app/vendedores');
		setSellers(data);
	}


	return (
		<div className="sign-in">
			<form className="name-input">
				<h5>Ingresar nombre de vendedor:</h5>
				<input
					type="text"
					placeholder="Ingresa tu nombre"
					name="sesionName"
					onChange={handleChange}
					required={true} // no funciona
					minLength={3} // no funciona
					maxLength={18}
				/>

				<button type='submit' className="new-session" onClick={handleClick}>
					Nueva sesión
				</button>
			</form>
			<div className="results">
				{
					(nameError && <p className="error">El nombre ingresado no es valido</p>)
					|| (exists && <p className="error">Ya existe una sesion activa con este nombre</p>)
					|| (isLoading && <Loader model={"qr"} />)
					|| (!exists && QR && <QRCode value={valueQR} />)
				}
			</div>
		</div>
	)
}

export default SignIn;