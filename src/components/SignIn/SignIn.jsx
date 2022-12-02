import React, { useState, useEffect, useCallback } from 'react';
import Loader from '../Loader/Loader';
import Success from '../Success/Success';
import './SignIn.scss';
import QRCode from "react-qr-code";
import { socket, getSellers } from '../../services/whatsapp';

function SignIn({ setBlockNav = {} }) {
	const [sellers, setSellers] = useState([]); // guarda lo que se va a mostrar en la datalist
	const [newSellerName, setNewSellerName] = useState(''); // nombre que se envia por socket al back para generar la sesion
	const [nameError, setNameError] = useState(); // en caso de errores en la longitud del nombre
	const [valueQR, setValueQR] = useState(''); // contiene el codigo qr en string que recibe del socket
	const [QR, setQR] = useState(false); // flag para indicar que se recibio el qr y debe dejar de cargar (!isLoading)
	const [isLoading, setIsLoading] = useState(false); // indica que esta esperando el QR
	const [isReady, setIsReady] = useState(false); // inicio sesion correctamente (ya sea por qr o autenticando una sesion guardada)
	const [inputValue, setInputValue] = useState(''); // contiene el valor del input de nombre de usuario para poder validarlo

	const blockNavigation = useCallback(() => setBlockNav(false), [setBlockNav]);

	// FETCH VENDEDORES
	useEffect(() => {
		getSellers(setSellers);
	}, []);

	const handleChange = e => { // cuando esta escribiendo
		setInputValue(e.target.value);
	}

	const handleClick = e => { // cuando hace click en nueva sesion		
		e.preventDefault();
		setNameError(false);

		if (inputValue.length > 2) { // !! faltan validaciones
			setNewSellerName(inputValue);
			setBlockNav(true);
		} else {
			setNameError(true);
		}
	}

	const addNewSession = useCallback(() => {
		if (newSellerName) {
			socket.emit("newSeller", newSellerName)
			setIsLoading(true);
			
			socket.on("qrNew", (qr) => {
				setValueQR(qr);
				setQR(true);
				setIsLoading(false);
			});

			socket.on("okSeller", () => {
				console.log('Acceso a Whatsapp Web validado');
				
				setIsReady(true);
				setIsLoading(false);
				setQR(false);
				blockNavigation();
			})

			//("qrError");
			//("sellerError");
		}

		return () => {
			socket.off("qrNew");
			socket.off("okSeller");
		}

	}, [newSellerName, blockNavigation])

	useEffect(() => {
		addNewSession();
	}, [addNewSession])

	return (
		<div className="sign-in">
			<form className="name-input">
				<input
					list="active-sessions"
					placeholder="Ingresa tu nombre"
					name="sesionName"
					onChange={handleChange}
					required={true}
				/>
				<datalist id="active-sessions">
					<option value=" " readOnly>---  Sesiones guardadas  ---</option>
					{
						sellers && sellers.map(seller => <option key={seller.number} value={seller.name} />)
					}
				</datalist>

				<button type='submit' className="new-session" onClick={handleClick}>
					Nueva sesión
				</button>
			</form>
			<div className="results">
				{
					(nameError && <p className="error">El nombre ingresado no es valido</p>)
					|| (isLoading && <Loader model={"qr"} />)
					|| (QR && <div className="qrImg"><QRCode value={valueQR} /></div>)
					|| (isReady && <Success />)
				}
			</div>
		</div>
	)
}

export default SignIn;