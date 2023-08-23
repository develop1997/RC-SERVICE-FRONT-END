/** @format */

import { useEffect, useState } from "react";
import "./AdminIndex.css";
import MainLayout from "../../../layouts/MainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AdminIndex() {
	const navigate = useNavigate();
	const [selectedTable, setSelectedTable] = useState("usuarios");
	const [tabledata, settabledata] = useState([]);
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
		settabledata([]);
		setSelectedTable(table);
	};

	const handleEditClick = (row) => {
		if (editingRow) {
			setEditingRow(null);
		} else {
			setEditingRow(row);
		}
	};

	useEffect(() => {
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTable]);

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
											return (
												<tr key={user._id}>
													<td>{user.correo}</td>
													<td>
														{user.rol.nombreRol}
													</td>
													<td>
														<button
															className="options-btn"
															onClick={() =>
																handleEditClick(
																	"test"
																)
															}></button>
														{editingRow ===
															"test" && (
															<div className="menu-emergente">
																<ul className="custom-ul">
																	<li className="custom-li">
																		testing
																	</li>
																	<li className="custom-li">
																		testing
																	</li>
																	<li className="custom-li">
																		testing
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
											return (
												<tr key={rol.rol._id}>
													<td>{rol.rol.nombreRol}</td>
													<td>
														<ul className="custom-ul">
															{rol.usuarios.map(
																(dato) => {
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
																	"test"
																)
															}></button>
														{editingRow ===
															"test" && (
															<div className="menu-emergente">
																<ul className="custom-ul">
																	<li className="custom-li">
																		testing
																	</li>
																	<li className="custom-li">
																		testing
																	</li>
																	<li className="custom-li">
																		testing
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
											<th>Usuarios con el permiso</th>
											<th>Accion</th>
										</tr>
									</thead>
									<tbody>
										{tabledata.map((permiso) => {
											return (
												<tr key={permiso.permiso._id}>
													<td>
														{
															permiso.permiso
																.permiso
														}
													</td>
													<td>
														<ul className="custom-ul">
															{permiso.usuarios.map(
																(dato) => {
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
																	"test"
																)
															}></button>
														{editingRow ===
															"test" && (
															<div className="menu-emergente">
																<ul className="custom-ul">
																	<li className="custom-li">
																		testing
																	</li>
																	<li className="custom-li">
																		testing
																	</li>
																	<li className="custom-li">
																		testing
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
					</div>
				</div>
			</MainLayout>
		</>
	);
}
