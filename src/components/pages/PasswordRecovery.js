/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import {
	formatReadableDate,
	getSesion,
	randomSixDigitNumber,
} from "../../utils/Functions";
import Modal from "../Modal";

function PasswordRecovery() {
	let noticiasContraseñas = [
		{
			id: 114445934,
			title: "Password Security Report",
			text: "Según una encuesta de Cyclonis, la mitad de los encuestados olvidan sus contraseñas cuatro o más veces al año. Esto significa que, en promedio, las personas olvidan sus contraseñas una vez cada tres meses. Además, el 27.95% de las personas olvidan sus contraseñas 10 o más veces al año, lo que equivale a casi una vez al mes.",
			url: "https://www.cyclonis.com/report-83-percent-users-surveyed-use-same-password-multiple-sites/",
			image: "https://www.cyclonis.com/images/2018/07/password-security-report-most-users-same-password-765x481.jpg",
			publish_date: "2018-07-13 18:54:03",
			author: "Zane",
			language: "es",
			source_country: "es",
		},
		{
			id: 126066502,
			title: "25+ Password statistics",
			text: "Un estudio realizado por Google en colaboración con Harris Poll encontró que el seguimiento de las contraseñas es una fuente de frustración para la mayoría de los estadounidenses. De hecho, un sorprendente tres de cada cuatro encuestados dicen que luchan con las contraseñas. Esto indica que la gestión de contraseñas es un problema común y generalizado",
			url: "https://www.comparitech.com/blog/information-security/password-statistics/",
			image: "https://cdn.comparitech.com/wp-content/uploads/2020/08/25-password-statistics-and-trends.webp",
			publish_date: "2023-03-2407 10:00:00",
			author: "AIMEE O'DRISCOLL",
			language: "es",
			source_country: "es",
		},
	];

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [codigoEscrito, setcodigoEscrito] = useState("");
	const [codigogenerado, setCodigogenerado] = useState("");
	const [exitoso, setexitoso] = useState(false);
	const [codigo, setCodigo] = useState(false);
	const [codigoAceptado, setCodigoAceptado] = useState(false);
	const [abrirModal, setabrirModal] = useState(false);

	const [iniciando, setIniciando] = useState(false);
	const [error, setError] = useState("");

	const [sesion, setsesion] = useState(undefined);

	let navigate = useNavigate();

	let api = process.env.REACT_APP_API_URL;

	useEffect(() => {
		setsesion(getSesion());
		if (sesion) {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sesion]);

	useEffect(() => {
		if (iniciando && !codigo) {
			let generado = randomSixDigitNumber();

			axios
				.post(api + "/send-email", {
					email: email,
					titulo: "Recupera tu contraseña",
					message:
						"Tu codigo para recuperar tu contraseña es: " +
						generado,
				})
				.then((res) => {
					setCodigogenerado(generado);
					setCodigo(true);
					setabrirModal(true);
				})
				.catch((e) => {
					setError(e.response.data.error || e.response.data.message);
				})
				.finally(() => {
					setIniciando(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iniciando]);

	useEffect(() => {
		if (codigo && iniciando) {
			if (codigogenerado === parseInt(codigoEscrito)) {
				setCodigoAceptado(true);
				setIniciando(false);
			} else {
				setError("Codigo incorrecto");
				setIniciando(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iniciando]);

	useEffect(() => {
		if (codigoAceptado && iniciando) {
			axios
				.put(api + "/users/password/" + email, {
					nuevaContraseña: password,
				})
				.then((res) => {
                    setexitoso(true)
				})
				.catch((e) => {
					setError(e.response.data.error || e.response.data.message);
				})
				.finally(() => {
					setIniciando(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iniciando]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!codigo) {
			if (email !== "") {
				setIniciando(true);
			}
		} else {
			if (codigoAceptado) {
				if (password !== "") {
					setIniciando(true);
				}
			} else {
				if (codigoEscrito !== "") {
					setIniciando(true);
				}
			}
		}
	};

	return (
		<MainLayout>
			<div className="login-form">
				<section>
					<form onSubmit={handleSubmit}>
						{error !== "" ? (
							<div className="input-field error">
								<p>{error}</p>
							</div>
						) : (
							<></>
						)}
						<h2>Recuperar contraseña</h2>
						{!codigo ? (
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
						) : codigoAceptado ? (
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
						) : (
							<div className="input-field">
								<label htmlFor="codigo">
									Ingresa el codigo:
								</label>
								<input
									type="text"
									id="codigo"
									placeholder="xxxxxx"
									value={codigoEscrito}
									onChange={(e) =>
										setcodigoEscrito(e.target.value)
									}
								/>
							</div>
						)}

						<p>
							¿No quieres estar aqui?{" "}
							<Link to="/login">Regresar</Link>
						</p>

						{iniciando ? <div className="spinner"></div> : <></>}
						<input
							type="submit"
							className="submit-btn page-button"
							value="Enviar"
						/>
					</form>
				</section>
				<div className="curious-data">
					{noticiasContraseñas.map((neww) => {
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
			</div>

			<Modal
				isOpen={abrirModal}
				onClose={() => {
					setabrirModal(false);
				}}
				title="El correo fue enviado"
				message="Se envio un codigo a tu correo, revisalo, podrias revisar spam en algunos casos"></Modal>

                <Modal
                    isOpen={exitoso}
                    onClose={() => {
                        setexitoso(false);
                        navigate("/login");
                    }}
                    title="Procedimiento exitoso"
                    message="Contraseña Actualizada con exito"></Modal>
		</MainLayout>
	);
}

export default PasswordRecovery;
