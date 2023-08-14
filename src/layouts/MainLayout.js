/** @format */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = (props) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	let closeByButtonTimeout;

	function logout() {
		document.cookie =
			"sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setIsLoggedIn(false);
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
							<li className="links">
								<button className="nav-button" onClick={logout}>
									Cerrar sesión
								</button>
							</li>
						) : (
							<></>
						)}
					</ul>
				</nav>
				<main>{props.children}</main>
			</section>
			<footer>footer</footer>
		</div>
	);
};

export default MainLayout;
