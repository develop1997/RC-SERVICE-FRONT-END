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
	const [permisions, setpermisions] = useState([]);
	const [selectedpermisions, setselectedpermisions] = useState([]);
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

	useEffect(() => {
		axios
			.get(api + "/admin-rol/permisos")
			.then((response) => {
				setpermisions(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
							navigate("/admin/show/usuarios");
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
							permisions: selectedpermisions,
						})
						.then((res) => {
							navigate("/admin/show/roles");
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
							navigate("/admin/show/permisos");
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

	console.log(selectedpermisions)

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
							nombreRol: response.data.rol.nombreRol,
						});
						setselectedpermisions(
							response.data.permisos.map((p) => {
								return p.id_permiso;
							})
						);
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
							<div className="horizontal-stack">
								<button
									className="add-btn page-button"
									onClick={() => {
										navigate("/admin/show/usuarios");
									}}>
									Atras
								</button>
							</div>
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
							<div className="horizontal-stack">
								<button
									className="add-btn page-button"
									onClick={() => {
										navigate("/admin/show/roles");
									}}>
									Atras
								</button>
							</div>
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
								{permisions.map((permission) => {
									const isChecked =
										selectedpermisions.includes(
											permission._id
										);

									const handlePermissionChange = (e) => {
										if (isChecked) {
											const updatedPermissions =
												selectedpermisions.filter(
													(id) =>
														id !== permission._id
												);
											setselectedpermisions(
												updatedPermissions
											);
										} else {
											setselectedpermisions([
												...selectedpermisions,
												permission._id,
											]);
										}
									};

									return (
										<div
											className="checkbox-list-item"
											key={permission._id}>
											<label
												htmlFor={
													"permission" +
													permission._id
												}>
												{permission.permiso}:
											</label>
											<input
												type="checkbox"
												id={
													"permission" +
													permission._id
												}
												checked={isChecked}
												onChange={
													handlePermissionChange
												}
											/>
										</div>
									);
								})}
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
							<div className="horizontal-stack">
								<button
									className="add-btn page-button"
									onClick={() => {
										navigate("/admin/show/permisos");
									}}>
									Atras
								</button>
							</div>
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
