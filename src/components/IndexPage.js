/** @format */

import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

function IndexPage() {
	useEffect(() => {
		document.title = "Inicio";
	}, []);
	return (
		<>
			<MainLayout>
				test
			</MainLayout>
		</>
	);
}

export default IndexPage;
