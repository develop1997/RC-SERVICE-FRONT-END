/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";
import MainLayout from "../../../layouts/MainLayout";
import { getSesion, isValidPassword } from "../../../utils/Functions";
import "./AdminAddResource.css";
import Select from "react-select";

export function AdminEditResource() {
	let { resource, id } = useParams();
	const [rol, setrol] = useState("");
	const [roles, setroles] = useState([]);
	let api = process.env.REACT_APP_API_URL;
	const [sesion, setsesion] = useState(undefined);
	let rolAdmin = process.env.REACT_APP_ADMIN_SESION_NAME;
	const navigate = useNavigate();

	const [formdata, setformdata] = useState({
		email: "",
		password: "",
		nombreRol: "",
		permiso: "",
	});

	const [iniciando, setIniciando] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		switch (resource) {
			case "user":
				if (
					formdata.email !== "" &&
					formdata.password !== "" &&
					formdata.nombreRol !== ""
				) {
					if (!isValidPassword(formdata.password)) {
						setError(
							"La contraseña debe tener al menos 8 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)."
						);
						return;
					}
					setIniciando(true);
				} else {
					setError("Los campos no pueden estar vacios.");
				}
				break;
			case "role":
				if (formdata.nombreRol !== "") {
					setIniciando(true);
				} else {
					setError("Los campos no pueden estar vacios.");
				}
				break;
			case "permision":
				if (formdata.permiso !== "") {
					setIniciando(true);
				} else {
					setError("Los campos no pueden estar vacios.");
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (iniciando) {
			switch (resource) {
				case "user":
					axios
						.put(api + "/users/" + id, {
							data: {
								correo: formdata.email,
								contraseña: formdata.password,
							},
							rol: formdata.nombreRol,
						})
						.then((res) => {
							navigate("/");
						})
						.catch((e) => {
							setError(
								e.response.data.error || e.response.data.message
							);
						})
						.finally(() => {
							setIniciando(false);
						});
					break;
				case "role":
					axios
						.put(api + "/admin-rol/role/" + id, {
							rol: {
								nombreRol: formdata.nombreRol,
							},
						})
						.then((res) => {
							navigate("/");
						})
						.catch((e) => {
							setError(
								e.response.data.error || e.response.data.message
							);
						})
						.finally(() => {
							setIniciando(false);
						});
					break;
				case "permision":
					axios
						.put(api + "/admin-rol/permision/" + id, {
							permiso: formdata.permiso,
						})
						.then((res) => {
							navigate("/");
						})
						.catch((e) => {
							setError(
								e.response.data.error || e.response.data.message
							);
						})
						.finally(() => {
							setIniciando(false);
						});
					break;
				default:
					break;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iniciando]);

	useEffect(() => {
		document.title = "Editar " + resource;
		if (!sesion) {
			setsesion(getSesion());
		} else {
			axios
				.get(api + "/users/email/" + sesion)
				.then((response) => {
					setrol(response.data.rol.nombreRol);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sesion]);

	useEffect(() => {
		axios
			.get(api + "/admin-rol/roles")
			.then((response) => {
				const renamedData = response.data.map((item) => ({
					label: item.nombreRol,
					value: item.nombreRol,
				}));
				setroles(renamedData);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		switch (resource) {
			case "user":
				axios
					.get(api + "/users/id/" + id)
					.then((response) => {
						setformdata({
							...formdata,
							email: response.data.correo,
							password: response.data.contraseña,
							nombreRol: response.data.rol.nombreRol,
						});
					})
					.catch((error) => {
						console.error("Error:", error);
					});
				break;
			case "role":
				axios
					.get(api + "/admin-rol/role/" + id)
					.then((response) => {
						setformdata({
							...formdata,
							nombreRol: response.data.nombreRol,
						});
					})
					.catch((error) => {
						console.error("Error:", error);
					});
				break;
			case "permision":
				axios
					.get(api + "/admin-rol/permision/" + id)
					.then((response) => {
						setformdata({
							...formdata,
							permiso: response.data.permiso,
						});
					})
					.catch((error) => {
						console.error("Error:", error);
					});
				break;
			default:
				break;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!sesion || rol === "") {
		return (
			<MainLayout>
				<div className="spinner"></div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			{rol !== rolAdmin ? (
				<></>
			) : (
				<section className="adding-resource">
					{resource === "user" ? (
						<>
							<form onSubmit={handleSubmit}>
								{error !== "" ? (
									<div className="input-field error">
										<p>{error}</p>
									</div>
								) : (
									<></>
								)}
								<h2>Editar Usuario</h2>
								<div className="input-field">
									<label htmlFor="correo">Correo:</label>
									<input
										type="text"
										id="correo"
										placeholder="example@example.com"
										value={formdata.email}
										onChange={(e) =>
											setformdata({
												...formdata,
												email: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="password">
										Contraseña:
									</label>
									<input
										type="password"
										id="password"
										placeholder="********"
										value={formdata.password}
										onChange={(e) =>
											setformdata({
												...formdata,
												password: e.target.value,
											})
										}
									/>
								</div>
								<div className="input-field">
									<label htmlFor="country">Rol:</label>

									<Select
										className="select"
										options={roles}
										value={{
											value: formdata.nombreRol,
											label: formdata.nombreRol,
										}}
										onChange={(selectedOption) =>
											setformdata({
												...formdata,
												nombreRol: selectedOption.value,
											})
										}
										theme={(theme) => ({
											...theme,
											borderRadius: 10,
											colors: {
												...theme.colors,
												text: "black",
												primary25: "#b3b3b380",
												primary: "black",
											},
										})}
										placeholder="Selecciona una opción"
										//   isSearchable={false} // Desactiva la búsqueda
									/>
								</div>
								{iniciando ? (
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
						</>
					) : resource === "role" ? (
						<>
							<form onSubmit={handleSubmit}>
								{error !== "" ? (
									<div className="input-field error">
										<p>{error}</p>
									</div>
								) : (
									<></>
								)}
								<h2>Editar Rol</h2>
								<div className="input-field">
									<label htmlFor="role">
										Nombre del Rol:
									</label>
									<input
										type="text"
										id="role"
										placeholder="example"
										value={formdata.nombreRol}
										onChange={(e) =>
											setformdata({
												...formdata,
												nombreRol: e.target.value,
											})
										}
									/>
								</div>
								{iniciando ? (
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
						</>
					) : resource === "permision" ? (
						<>
							<form onSubmit={handleSubmit}>
								{error !== "" ? (
									<div className="input-field error">
										<p>{error}</p>
									</div>
								) : (
									<></>
								)}
								<h2>Editar Permiso</h2>
								<div className="input-field">
									<label htmlFor="permiso">
										Nombre del Permiso:
									</label>
									<input
										type="text"
										id="permiso"
										placeholder="example"
										value={formdata.permiso}
										onChange={(e) =>
											setformdata({
												...formdata,
												permiso: e.target.value,
											})
										}
									/>
								</div>
								{iniciando ? (
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
						</>
					) : (
						<></>
					)}
				</section>
			)}
			<Modal
				isOpen={rol !== rolAdmin}
				onClose={() => {
					navigate("/");
				}}
				title="Error"
				message="Para poder interactuar con esta interfaz tienes que ser administrador"></Modal>
		</MainLayout>
	);
}
