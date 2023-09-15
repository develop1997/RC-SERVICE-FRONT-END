/** @format */

import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
import { UserIndex } from "./pages/user/UserIndex";
import { getSesion } from "../utils/Functions";
import { Navigate } from "react-router-dom";

function IndexPage() {
	const [sesion, setsesion] = useState(undefined);
	const [rol, setrol] = useState("");
	let api = process.env.REACT_APP_API_URL;
	let rolAdmin = process.env.REACT_APP_ADMIN_SESION_NAME;

	useEffect(() => {
		document.title = "Inicio";
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

	if (!sesion) {
		return (
			<MainLayout>
				<div className="spinner"></div>
			</MainLayout>
		);
	}

	if (rol === rolAdmin) {
		return <Navigate to="/admin/show/usuarios"></Navigate>;
	} else {
		return <UserIndex></UserIndex>;
	}
}

export default IndexPage;