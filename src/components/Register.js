/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
	obtenerDosValoresAleatorios,
	formatReadableDate,
	isValidPassword,
	randomSixDigitNumber,
} from "../utils/Functions";

function Register() {
	const [news, setNews] = useState([]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [codigo, setCodigo] = useState("");

	const [codigoenviado, setCodigoEnviado] = useState("");
	const [error, setError] = useState("");
	const [validando, setValidando] = useState(false);
	const [enviandocodigo, setEnviando] = useState(false);
	const [registrando, setRegistrando] = useState(false);

	let navigate = useNavigate();

	let api = process.env.REACT_APP_API_URL;

	useEffect(() => {
		if (enviandocodigo) {
			let temp = randomSixDigitNumber();
			axios
				.post(api + "/send-message", {
					phoneNumber: phone,
					message: "Tu codigo de verificacion es: " + temp,
				})
				.then((res) => {
					setCodigoEnviado(temp);
					setValidando(true);
				})
				.catch((e) => {
					setError(e);
				})
				.finally(() => {
					setEnviando(false);
				});
		} else if (registrando) {
			axios
				.post(api + "/users", {
					correo: email,
					contraseña: password,
				})
				.then((res) => {
					navigate("/login");
				})
				.catch((e) => {
					setError(e.response.data.error || e.response.data.message);
				})
				.finally(() => {
					setRegistrando(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enviandocodigo, registrando]);

	useEffect(() => {
		document.title = "Registro";

		const config = {
			headers: {
				apikey: process.env.REACT_APP_NEWS_API_KEY,
			},
		};

		const params = {
			text: "inmuebles",
			number: "100",
			language: "es",
		};

		axios
			.get("https://api.apilayer.com/world_news/search-news", {
				headers: config.headers,
				params,
			})
			.then((response) => {
				setNews(obtenerDosValoresAleatorios(response.data.news));
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email !== "" && password !== "" && phone !== "") {
			if (!isValidPassword(password)) {
				setError(
					"La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)."
				);
				return;
			}
			setEnviando(true);
		}
	};

	const handleValidate = (e) => {
		e.preventDefault();
		if (codigoenviado === parseInt(codigo)) {
			setRegistrando(true);
		} else {
			setError("Codigo incorrecto");
		}
	};

	return (
		<MainLayout>
			<div className="register-form">
				<div className="curious-data">
					{news.map((neww) => {
						return (
							<div className="card" key={neww.id}>
								<div className="header-card-img">
									<img
										src={neww.image}
										alt="imagen noticia"
									/>
									<h3>{neww.title}</h3>
								</div>
								<p>{neww.text}</p>
								<div className="date-autor-new">
									<h5>{neww.author}</h5>
									<p>
										{formatReadableDate(neww.publish_date)}
									</p>
								</div>
								<a
									href={neww.url}
									target="_blank"
									rel="noopener noreferrer">
									Read more
								</a>
							</div>
						);
					})}
				</div>
				<section>
					{validando ? (
						<form onSubmit={handleValidate}>
							{error !== "" ? (
								<div className="input-field error">
									<p>{error}</p>
								</div>
							) : (
								<></>
							)}
							<div className="input-field">
								<button
									className="page-button"
									onClick={() => {
										setError("");
										setValidando(false);
									}}>
									Atras
								</button>
							</div>
							<h2>Registrate</h2>
							<div className="input-field">
								<label htmlFor="codigo">
									Ingresa el codigo enviado al WhatsApp:
								</label>
								<input
									type="number"
									id="codigo"
									placeholder="xxxxxx"
									value={codigo}
									onChange={(e) => setCodigo(e.target.value)}
								/>
							</div>
							{registrando ? (
								<div className="spinner"></div>
							) : (
								<></>
							)}
							<input
								type="submit"
								className="submit-btn page-button"
								value="Enviar"
							/>
						</form>
					) : (
						<form onSubmit={handleSubmit}>
							{error !== "" ? (
								<div className="input-field error">
									<p>{error}</p>
								</div>
							) : (
								<></>
							)}
							<h2>Registrate</h2>
							<div className="input-field">
								<label htmlFor="correo">Correo:</label>
								<input
									type="text"
									id="correo"
									placeholder="example@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password">Contraseña:</label>
								<input
									type="password"
									id="password"
									placeholder="********"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="phone">
									Teléfono (WhatsApp):
								</label>
								<input
									type="text"
									id="phone"
									placeholder="+xxx xxxxxxxxxx"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
							</div>
							{enviandocodigo ? (
								<div className="spinner"></div>
							) : (
								<></>
							)}
							<input
								type="submit"
								className="submit-btn page-button"
								value="Enviar"
							/>
						</form>
					)}
				</section>
			</div>
		</MainLayout>
	);
}

export default Register;
