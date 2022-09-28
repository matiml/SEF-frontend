import React, { useState, useEffect } from 'react';

// import QRImage from '../../assets/img/QR.png';
import Loader from '../Loader/Loader';
import './SignIn.scss';
import QRCode from "react-qr-code";
import io from 'socket.io-client';

 const  socket = io('https://sef-production-a2d4.up.railway.app')


function SignIn() {

	const [sellers, setSellers] = useState([]); // Contiene los sellers del fetch
	const [inputValue, setInputValue] = useState(''); // Lo que se escribe en el input
	const [newSellerName, setNewSellerName] = useState(''); // Lo que se capto del input al hacer click
	const [nameError, setNameError] = useState(); // Si el nombre no es valido
	const [exists, setExists] = useState(); // Verificar si existe el nombre
	const [QR, setQR] = useState(false); // Si pasa las verificaciones se provee el QR
	const [isLoading, setIsLoading] = useState(false); // para determinar cuando se esta cargando
	const [itsOk, setItsOk] = useState(); // para activar el loader
    const  [valueQR, setValueQR] =useState('');

	useEffect(() => {
		changeExistsState();
	}, [newSellerName])

	const changeExistsState =  () => {
		setExists(sellers.includes(newSellerName));
		
		if(newSellerName && !exists) {
			socket.emit("newSeller", newSellerName)
			setIsLoading(true);
			socket.on("qrNew", (qr)=>{
				
				setValueQR(qr);
				setQR(true);
				setIsLoading(false);
		  })
		}
	}

	/* const agregarAlArray = (name) => {
		!exists && sellers.push(name);
		setExists(false);
	} */
	
	const handleChange = e => { // cuando esta escribiendo
		setInputValue(e.target.value);
	}

	const handleClick = e => { // cuando hace click en nueva sesion		
		e.preventDefault();
		setNameError(false);

		if (inputValue.length > 2) {
			setNewSellerName(inputValue);
			setItsOk(true);	

		} else {
			setNameError(true);
		}
	}

	/* useEffect(() => {
		if(itsOk) {
			setIsLoading(true);
      		setTimeout(() => {
        		setIsLoading(false)
      		}, 1700);
		}
	}, [QR, newSellerName, itsOk]) */

	// FETCH VENDEDORES PARA VERIFICAR QUE NO HAYAN SESIONES REPETIDAS  
	useEffect(() => {
		sellersFetch();
	}, []);

	const sellersFetch = async () => {
		// '/vendedores'
		const response = await fetch('https://sef-production-a2d4.up.railway.app/vendedores');
		const sellersJSON = await response.json();
		const data = sellersJSON.map(seller => seller.name)
		setSellers(data);
	}

	// const ref = useRef();

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
					// ref={ref}
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
					|| (!exists && QR &&  <QRCode value={valueQR}  /> )
				}
            
			</div>
		</div>
	)
}

export default SignIn;