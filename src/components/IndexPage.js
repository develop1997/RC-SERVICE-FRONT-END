/** @format */

import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

function IndexPage() {
	const [sesion, setsesion] = useState("");

	useEffect(() => {
		document.title = "Inicio";
		const sessionCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("sessionToken="));
		if (sessionCookie !== undefined) {
			setsesion(sessionCookie.split("=")[1]);
		}
	}, []);

	return (
		<>
			<MainLayout>test</MainLayout>
		</>
	);
}

export default IndexPage;
