/** @format */

import { useEffect, useState } from "react";
import "./AdminIndex.css";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import deleteIcn from "../../../assets/delete-icon.svg";
import editIcn from "../../../assets/edit-icon.svg";
import ModalQuestion from "../../ModalQuestion";

export function AdminIndex() {
	const navigate = useNavigate();
	const [selectedTable, setSelectedTable] = useState("usuarios");
	const [tabledata, settabledata] = useState([]);
	const [decidiendo, setdecidiendo] = useState(undefined);
	const [editingRow, setEditingRow] = useState(null);
	let api = process.env.REACT_APP_API_URL;

	function handleAdd() {
		switch (selectedTable) {
			case "usuarios":
				navigate("/add/user");
				break;
			case "roles":
				navigate("/add/role");
				break;
			case "permisos":
				navigate("/add/permision");
				break;
			default:
				break;
		}
	}

	const handleButtonClick = (table) => {
		if (selectedTable !== table) {
			settabledata([]);
			setSelectedTable(table);
		}
	};

	const handleEditClick = (row) => {
		if (editingRow) {
			setEditingRow(null);
		} else {
			setEditingRow(row);
		}
	};

	function getData() {
		if (selectedTable === "usuarios") {
			axios
				.get(api + "/users/")
				.then((response) => {
					settabledata(response.data);
					// console.log(response.data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} else if (selectedTable === "roles") {
			axios
				.get(api + "/admin-rol/lista-roles-usuarios")
				.then((response) => {
					settabledata(response.data);
					// console.log(response.data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} else if (selectedTable === "permisos") {
			axios
				.get(api + "/admin-rol/lista-permisos-usuarios")
				.then((response) => {
					settabledata(response.data);
					// console.log(response.data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTable]);

	useEffect(() => {
		if (tabledata === undefined) {
			getData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabledata]);

	return (
		<>
			<MainLayout>
				<div className="table-container">
					<ul className="table-header custom-ul">
						<li>
							<button
								onClick={() => handleButtonClick("usuarios")}
								className={
									selectedTable === "usuarios"
										? "selected"
										: ""
								}>
								Usuarios
							</button>
						</li>
						<li>
							<button
								onClick={() => handleButtonClick("roles")}
								className={
									selectedTable === "roles" ? "selected" : ""
								}>
								Roles
							</button>
						</li>
						<li>
							<button
								onClick={() => handleButtonClick("permisos")}
								className={
									selectedTable === "permisos"
										? "selected"
										: ""
								}>
								Permisos
							</button>
						</li>
					</ul>
					<div className="add-btn-container">
						<button
							className="add-btn page-button"
							onClick={handleAdd}>
							<span className="add-icon"> </span>
							Añadir
						</button>
					</div>
					<div className="table-scroll">
						{tabledata && tabledata.length > 0 ? (
							<>
								{selectedTable === "usuarios" && (
									<>
										<table>
											<thead>
												<tr>
													<th>Correo</th>
													<th>Rol</th>
													<th>Accion</th>
												</tr>
											</thead>
											<tbody>
												{tabledata.map((user) => {
													if (!user) {
														return null;
													}
													return (
														<tr key={user._id}>
															<td>
																{user.correo}
															</td>
															<td>
																{user.rol
																	.nombreRol
																	? user.rol
																			.nombreRol
																	: ""}
															</td>
															<td>
																<button
																	className="options-btn"
																	onClick={() =>
																		handleEditClick(
																			user._id
																		)
																	}></button>
																{editingRow ===
																	user._id && (
																	<div className="menu-emergente">
																		<ul className="custom-ul pop-menu">
																			<li
																				className="custom-li pop-menu-option"
																				onClick={() => {
																					setdecidiendo(
																						user._id
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
																			<li
																				className="custom-li pop-menu-option"
																				onClick={() => {
																					navigate(
																						"/edit/user/" +
																							user._id
																					);
																				}}>
																				<img
																					src={
																						editIcn
																					}
																					alt="x"
																				/>
																				Editar
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
								)}
								{selectedTable === "roles" && (
									<>
										<table>
											<thead>
												<tr>
													<th>Nombre</th>
													<th>Usuarios con el rol</th>
													<th>Accion</th>
												</tr>
											</thead>
											<tbody>
												{tabledata.map((rol) => {
													if (!rol.rol) {
														return null;
													}
													return (
														<tr key={rol.rol._id}>
															<td>
																{rol.rol
																	.nombreRol
																	? rol.rol
																			.nombreRol
																	: ""}
															</td>
															<td>
																<ul className="custom-ul">
																	{rol.usuarios.map(
																		(
																			dato
																		) => {
																			return (
																				<>
																					<li
																						className="custom-li"
																						key={
																							dato.correo
																						}>
																						{
																							dato.correo
																						}
																					</li>
																				</>
																			);
																		}
																	)}
																</ul>
															</td>
															<td>
																<button
																	className="options-btn"
																	onClick={() =>
																		handleEditClick(
																			rol
																				.rol
																				._id
																		)
																	}></button>
																{editingRow ===
																	rol.rol
																		._id && (
																	<div className="menu-emergente">
																		<ul className="custom-ul pop-menu">
																			<li
																				className="custom-li pop-menu-option"
																				onClick={() => {
																					setdecidiendo(
																						rol
																							.rol
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
																			<li
																				className="custom-li pop-menu-option"
																				onClick={() => {
																					navigate(
																						"/edit/role/" +
																							rol
																								.rol
																								._id
																					);
																				}}>
																				<img
																					src={
																						editIcn
																					}
																					alt="x"
																				/>
																				Editar
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
								)}
								{selectedTable === "permisos" && (
									<>
										<table>
											<thead>
												<tr>
													<th>Nombre</th>
													<th>
														Usuarios con el permiso
													</th>
													<th>Accion</th>
												</tr>
											</thead>
											<tbody>
												{tabledata.map((permiso) => {
													if (!permiso.permiso) {
														return null;
													}
													return (
														<tr
															key={
																permiso.permiso
																	._id
															}>
															<td>
																{
																	permiso
																		.permiso
																		.permiso
																}
															</td>
															<td>
																<ul className="custom-ul">
																	{permiso.usuarios.map(
																		(
																			dato
																		) => {
																			return (
																				<>
																					<li
																						className="custom-li"
																						key={
																							dato.correo
																						}>
																						{
																							dato.correo
																						}
																					</li>
																				</>
																			);
																		}
																	)}
																</ul>
															</td>
															<td>
																<button
																	className="options-btn"
																	onClick={() =>
																		handleEditClick(
																			permiso
																				.permiso
																				._id
																		)
																	}></button>
																{editingRow ===
																	permiso
																		.permiso
																		._id && (
																	<div className="menu-emergente">
																		<ul className="custom-ul pop-menu">
																			<li
																				className="custom-li pop-menu-option"
																				onClick={() => {
																					setdecidiendo(
																						permiso
																							.permiso
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
																			<li
																				className="custom-li pop-menu-option"
																				onClick={() => {
																					navigate(
																						"/edit/permision/" +
																							permiso
																								.permiso
																								._id
																					);
																				}}>
																				<img
																					src={
																						editIcn
																					}
																					alt="x"
																				/>
																				Editar
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
								)}
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
						"Estas seguro/a de que quieres eliminar al usuario?"
					}
					onAccept={() => {
						if (selectedTable === "usuarios") {
							axios
								.delete(api + "/users/" + decidiendo)
								.then((response) => {
									handleEditClick(decidiendo);
									settabledata(undefined);
								})
								.catch((error) => {
									console.error("Error:", error);
								});
						} else if (selectedTable === "roles") {
							axios
								.delete(api + "/admin-rol/role/" + decidiendo)
								.then((response) => {
									handleEditClick(decidiendo);
									settabledata(undefined);
								})
								.catch((error) => {
									console.error("Error:", error);
								});
						} else if (selectedTable === "permisos") {
							axios
								.delete(
									api + "/admin-rol/permiso/" + decidiendo
								)
								.then((response) => {
									handleEditClick(decidiendo);
									settabledata(undefined);
								})
								.catch((error) => {
									console.error("Error:", error);
								});
						}
						setdecidiendo(undefined);
					}}
					onReject={() => {
						setdecidiendo(undefined);
					}}
					rejectText={"Cancelar"}
					title={"Eliminar Usuario"}></ModalQuestion>
			</MainLayout>
		</>
	);
}
