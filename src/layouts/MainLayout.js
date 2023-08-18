/** @format */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import ModalQuestion from "../components/ModalQuestion";
import { useLocation } from "react-router-dom";
import Modal from "../components/Modal";
import { formatearCorreo } from "../utils/Functions";

const MainLayout = (props) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [closesesion, setClosesesion] = useState(false);
	const [sesion, setsesion] = useState(undefined);
	const navigate = useNavigate();
	const location = useLocation();
	let closeByButtonTimeout;

	function logout() {
		setClosesesion(true);
	}
	function logoutCanceled() {
		setClosesesion(false);
	}
	function noSesion() {
		navigate("/login");
	}
	function logOutAcepted() {
		document.cookie =
			"sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setIsLoggedIn(false);
		navigate("/login");
	}

	function closeByButton() {
		closeByButtonTimeout = setTimeout(() => {
			setIsHovered(false);
		}, 500);
	}

	useEffect(() => {
		const sessionCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("sessionToken="));
		setIsLoggedIn(sessionCookie !== undefined);
		if (sessionCookie) {
			setsesion(sessionCookie.split("=")[1]);
		}
	}, []);

	const handleMenuHover = () => {
		clearTimeout(closeByButtonTimeout);
		setIsHovered(true);
	};

	const handclickMenu = () => {
		setIsHovered(!isHovered);
	};

	const handleMenuLeave = () => {
		closeByButton();
	};

	return (
		<>
			<div className={`structure ${isHovered ? "hovered" : ""}`}>
				<header>
					<button
						className="menu-btn"
						onClick={handclickMenu}
						onMouseEnter={handleMenuHover}
						onMouseLeave={handleMenuLeave}></button>
					<Link to="/">RC-SERVICE</Link>
					{isLoggedIn ? (
						<></>
					) : (
						<Link to="/login" className="page-button login-btn">
							Iniciar sesion
						</Link>
					)}
				</header>
				<section className="content">
					<nav
						onMouseEnter={handleMenuHover}
						onMouseLeave={handleMenuLeave}>
						<ul>
							{isLoggedIn ? (
								<>
									<li className="links">
										<button
											className="nav-button"
											onClick={logout}>
											<span className="nav-icon log-out"></span>
											<span>Cerrar sesión</span>
										</button>
									</li>
									<li className="links">
										<button
											className="nav-button"
											// onClick={logout}
										>
											<span className="nav-icon profile"></span>
											<span>{formatearCorreo(sesion)}</span>
										</button>
									</li>
								</>
							) : (
								<></>
							)}
						</ul>
					</nav>
					<main>{props.children}</main>
				</section>
				<footer>footer</footer>
			</div>
			<ModalQuestion
				isOpen={closesesion}
				title="Seguro?"
				message="Seguro de que quieres cerrar la sesion?"
				acceptText="Aceptar"
				rejectText="Cancelar"
				onAccept={logOutAcepted}
				onReject={logoutCanceled}></ModalQuestion>
			{location.pathname === "/" ? (
				<Modal
					isOpen={!isLoggedIn}
					onClose={noSesion}
					title="Inicia sesion"
					message="Debes iniciar sesion"></Modal>
			) : (
				<></>
			)}
		</>
	);
};

export default MainLayout;
