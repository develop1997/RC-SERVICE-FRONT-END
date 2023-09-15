/** @format */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../../Modal";
import MainLayout from "../../../layouts/MainLayout";
import { getSesion } from "../../../utils/Functions";
import "./AdminIndex.css";
import deleteIcn from "../../../assets/delete-icon.svg";
import Select from "react-select";
import ModalQuestion from "../../ModalQuestion";
import "./AdminGestionatePermisions.css";

export function AdminGestionatePermisions() {
	let { id } = useParams();
	const [editingRow, setEditingRow] = useState(null);
	const [NuevoUsuario, setNuevoUsuario] = useState("");
	const [Usuarios, setUsuarios] = useState(undefined);
	const [AllUsers, setAllUsers] = useState([]);
	const [rol, setrol] = useState("");
	let api = process.env.REACT_APP_API_URL;
	const [sesion, setsesion] = useState(undefined);
	let rolAdmin = process.env.REACT_APP_ADMIN_SESION_NAME;
	const [decidiendo, setdecidiendo] = useState(undefined);
	const navigate = useNavigate();

	const handleEditClick = (row) => {
		if (editingRow) {
			setEditingRow(null);
		} else {
			setEditingRow(row);
		}
	};

	useEffect(() => {
		document.title = "Gestionar Permisos";
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

	function getUsers() {
		axios
			.get(api + "/admin-rol//permision/" + id + "/users/")
			.then((response) => {
				setUsuarios(response.data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}

	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (Usuarios) {
			axios
				.get(api + "/users")
				.then((response) => {
					let test = Usuarios.map((x) => x.id_usuario.correo);
					let filtrandoUsuarios = response.data.filter(
						(value) => !test.includes(value.correo)
					);
					const renamedData = filtrandoUsuarios.map((item) => ({
						label: item.correo,
						value: item._id,
					}));
					setAllUsers(renamedData);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Usuarios]);
	function handleAddUser() {
		if (NuevoUsuario !== "") {
			axios
				.post(
					api +
						"/admin-rol/usuarios/" +
						NuevoUsuario +
						"/permisos/" +
						id
				)
				.then((response) => {
					getUsers();
				})
				.catch((error) => {
					console.error("Error:", error);
				})
				.finally(() => {
					setNuevoUsuario("");
				});
		}
	}

	if (!sesion || rol === "") {
		return (
			<MainLayout>
				<div className="spinner"></div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="table-container">
				<h2>Usuarios con el Permiso</h2>
				<div className="add-btn-container">
					<button className="add-btn page-button"
					onClick={()=>{
						navigate("/admin/show/permisos")
					}}
					>
						Atras
					</button>
					<Select
						className="select-users separate-select"
						options={AllUsers}
						onChange={(selectedOption) =>
							setNuevoUsuario(selectedOption.value)
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
						placeholder="Selecciona un usuario"
						//   isSearchable={false} // Desactiva la búsqueda
					/>
					<button
						className="add-btn page-button separate-select"
						onClick={handleAddUser}>
						<span className="add-icon"> </span>
						Añadir
					</button>
				</div>
				<div className="table-scroll">
					{Usuarios && Usuarios.length > 0 ? (
						<>
							<table>
								<thead>
									<tr>
										<th>ID</th>
										<th>Correo</th>
										<th>Accion</th>
									</tr>
								</thead>
								<tbody>
									{Usuarios.map((usuario) => {
										if (!usuario) {
											return null;
										}
										return (
											<tr key={usuario.id_usuario._id}>
												<td>
													{usuario.id_usuario._id}
												</td>
												<td>
													{usuario.id_usuario.correo}
												</td>
												<td>
													<button
														className="options-btn"
														onClick={() => {
															handleEditClick(
																usuario
																	.id_usuario
																	._id
															);
														}}></button>
													{editingRow ===
														usuario.id_usuario
															._id && (
														<div className="menu-emergente">
															<ul className="custom-ul pop-menu">
																<li
																	className="custom-li pop-menu-option"
																	onClick={() => {
																		setdecidiendo(
																			usuario
																				.id_usuario
																				._id
																		);
																	}}>
																	<img
																		src={
																			deleteIcn
																		}
																		alt="x"
																	/>
																	Eliminar
																</li>
															</ul>
														</div>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</>
					) : (
						<div className="spinner"></div>
					)}
				</div>
			</div>
			<ModalQuestion
				acceptText={"Eliminar"}
				isOpen={decidiendo !== undefined}
				message={
					"Estas seguro/a de que quieres quitarle el permiso al usuario?"
				}
				onAccept={() => {
					axios
						.delete(
							api +
								"/admin-rol/usuarios/" +
								decidiendo +
								"/permisos/" +
								id
						)
						.then((response) => {
							getUsers();
						})
						.catch((error) => {
							console.error("Error:", error);
						});
					setdecidiendo(undefined);
				}}
				onReject={() => {
					setdecidiendo(undefined);
				}}
				rejectText={"Cancelar"}
				title={"Revocar Permiso"}></ModalQuestion>
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
