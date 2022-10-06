import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../Loader/Loader';
import Success from '../Success/Success';
import './SignIn.scss';
import QRCode from "react-qr-code";
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('https://sef-production-a2d4.up.railway.app')

function SignIn({ setBlockNav = {} }) {
	const [sellers, setSellers] = useState([]);
	const [inputValue, setInputValue] = useState('');
	const [newSellerName, setNewSellerName] = useState('');
	const [nameError, setNameError] = useState();
	const [exists, setExists] = useState();
	const [QR, setQR] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [valueQR, setValueQR] = useState('');
	const [isReady, setIsReady] = useState(false);

	const addNewSession = useCallback(() => {
		setExists(sellers.includes(newSellerName));

		if (newSellerName && !exists) {
			socket.emit("newSeller", newSellerName)
			setIsLoading(true);
			socket.on("qrNew", (qr) => {
				console.log(qr);
				setValueQR(qr);
				setQR(true);
				setIsLoading(false);
			})

			socket.on("okSeller", () => { 
				console.log('ok')
				setIsReady(true); 
				setQR(false);
				setBlockNav(false);
			})

			//socket.on("qrError", (e) => console.log(e))
			//socket.on("sellerError", (e) => console.log(e))
		}

		return () => {
			socket.off("qrNew");
			socket.off("okSeller");
			//socket.off("qrError");
			//socket.off("sellerError");
		}

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
			setBlockNav(true);
		} else {
			setNameError(true);
			// return;
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
				<input
					list="active-sessions"
					placeholder="Ingresa tu nombre"
					name="sesionName"
					onChange={handleChange}
					required={true} // no funciona
					//minLength={3} no funciona como deberia
					//maxLength={18}
				/>
				<datalist id="active-sessions">
					<option value=" " readonly>---  Sesiones guardadas  ---</option>
					{
						sellers && sellers.map(seller => <option value={seller.name} />)
					}
				</datalist>

				<button type='submit' className="new-session" onClick={handleClick}>
					Nueva sesión
				</button>
			</form>
			<div className="results">
				{
					(nameError && <p className="error">El nombre ingresado no es valido</p>)
					|| (exists && <p className="error">Ya existe una sesion activa con este nombre</p>)
					|| (isLoading && <Loader model={"qr"} />)
					|| (!exists && QR && <div className="qrImg"><QRCode value={valueQR} /></div>)
					|| (isReady && <Success />)
				}
			</div>
		</div>
	)
}

export default SignIn;