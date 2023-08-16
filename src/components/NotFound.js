/** @format */

import { useEffect } from "react";
import image1 from "../assets/error-404-alert.png"; 
import image2 from "../assets/error-404-art.png"; 
import MainLayout from "../layouts/MainLayout";

const NotFound = () => {
	useEffect(() => {
		document.title = "Error";
	}, []);
	return (
		<MainLayout>
			<div>
				<h2>Error 404: Página no encontrada</h2>
				<p>La página que estás buscando no existe.</p>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<img
						src={image1}
						alt="Imagen 1"
						style={{ marginRight: "10px", width: "200px" }}
					/>
					<img
						src={image2}
						alt="Imagen 2"
						style={{ marginLeft: "10px", width: "200px" }}
					/>
				</div>
			</div>
		</MainLayout>
	);
};

export default NotFound;
