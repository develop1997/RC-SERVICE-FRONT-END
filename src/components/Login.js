/** @format */

import { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
	formatReadableDate,
	// eslint-disable-next-line no-unused-vars
	obtenerDosValoresAleatorios,
} from "../utils/Functions";

function Login() {
	const [news, setNews] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [iniciando, setIniciando] = useState(false);
	const [error, setError] = useState("");

	let navigate = useNavigate();

	let api = process.env.REACT_APP_API_URL;

	useEffect(() => {
		if (iniciando) {
			axios
				.post(api + "/users/login", {
					correo: email,
					contraseña: password,
				})
				.then((res) => {
					document.cookie = "sessionToken=" + email + ";path=/";
					navigate("/");
				})
				.catch((e) => {
					setError(e.response.data.error || e.response.data.message);
				})
				.finally(() => {
					setIniciando(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [iniciando]);

	useEffect(() => {
		document.title = "Inicia sesión";

		// eslint-disable-next-line no-unused-vars
		const config = {
			headers: {
				apikey: process.env.REACT_APP_NEWS_API_KEY,
			},
		};

		// eslint-disable-next-line no-unused-vars
		const params = {
			text: "inmuebles",
			number: "100",
			language: "es",
		};

		// axios
		// 	.get("https://api.apilayer.com/world_news/search-news", {
		// 		headers: config.headers,
		// 		params,
		// 	})
		// 	.then((response) => {
		// 		setNews(obtenerDosValoresAleatorios(response.data.news));
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error:", error);
		// 	});

		setNews([
			{
				id: 114445934,
				title: "Sale a la venta una vivienda dentro de un convento del siglo XVI",
				text: 'Sale a la venta una vivienda dentro de un convento del siglo XVI Archivado en: Empresas Comunicae | miércoles, 10 de mayo de 2023, 16:50 La empresa Firenze Resurgo S.L. recibe el encargo de promocionar la venta de una vivienda singular situada dentro del Claustro de un Convento del siglo XVI. En palabras de su Socio Director Juan Carlos Romero Muñoz: "el singular inmueble permite disfrutar en pleno siglo XXI de todos los avances tecnológicos y combinarlos con más de 500 años de historia de una vivienda, situada dentro del claustro de un antiguo convento en la falda de los Montes de la Sierra de Gredos" Un inmueble singular y privilegiado con carácter propio Posiblemente entorno al año 1507, se funda el Convento de las Monjas en la actual localidad de Aldeanueva de Santa Cruz. Un Convento de religiosas de la Orden de Santo Domingo. Ni qué decir tiene, que más de 500 años de historia dan para mucho, y que en todo ese tiempo el Convento atravesó momentos álgidos y otros menos halagüeños. Un incendio originado en el Convento en el año 1565 devoró buena parte del inmueble mandándose reedificar posteriormente, y llegando hasta hoy restos que proceden de dicha reedificación. Ya en el siglo XVIII, muy probablemente al calor de las sucesivas desamortizaciones de Mendizábal, durante los años 1833 al 1866 se tabican determinadas estancias y se venden como viviendas privadas a particulares. Y hoy, en pleno siglo XXI, sigue brillando con especial belleza el conjunto Convento de las Monjas de Aldeanueva de Santa Cruz, con mención a las entradas al mismo y Claustro del Convento, donde se ubica el inmueble que se presenta. El acceso a la vivienda se efectúa mediante unas escaleras situadas en el mismo Claustro del Convento, dado paso a la primera planta del inmueble. Con vistas a la Sierra de Gredos y al Claustro del Convento, se puede disfrutar de la tranquilidad de este maravilloso enclave abulense. La cercanía a poblaciones como Piedrahita, Barco de Ávila o inclusive el Valle del Jerte, a tan sólo 20 minutos en coche, hacen posible planificar atractivas rutas turísticas en las que mezclar naturaleza y gastronomía con historia y tradición castellana. Nuevas tecnologías mezcladas con elementos del siglo XVI Son muchas las cualidades por las que este inmueble destaca, pero entre todas ellas quizá la más impactante sería la mezcla de elementos arquitectónicos históricos con nuevas tecnologías. Disfrutar navegando por Internet con fibra o inclusive mantener un sistema de videovigilancia con alarma activa entre muros de piedra que rebosan belleza, historias, serenidad y tranquilidad, hacen que el espacio sea confortable, acogedor, único, dentro de un ambiente mágico. Una propiedad privada absolutamente reformada, con un carácter propio forjado durante más de 500 años de historia, impregnada de una atmosfera singular y única que evoca la espiritualidad de siglos pasados. La vivienda tiene 200 m2 construidos y repartidos en dos plantas, cinco grandes habitaciones, salón, cocina, cuarto de baño y aseo. El lugar ideal para poder vivir todo el año o inclusive como segunda residencia para teletrabajar, gracias a la instalación de fibra óptica disponible y disfrutar de la comodidad, belleza y elegancia de algo único. La amplitud del inmueble permite desde un taller de pintura, pasando por una sala de juegos, o de teletrabajo, o espacio para practicar yoga, meditar y relajarse en un lugar acogedor y de una gran belleza. Una ocasión irrepetible para invertir en un inmueble único La venta de esta propiedad supone también una oportunidad de inversión en un inmueble único, por sus especiales características, su importancia histórica, así como por la localización geográfica a tan sólo dos horas de Madrid, poco más de una hora desde Salamanca o una hora desde Ávila capital aproximadamente. Con un precio de 290.000 euros, impuestos no incluidos, se puede ser propietario de este singular inmueble en pleno corazón de la Sierra de Gredos, disfrutando de una exclusiva y singular casa rural de más de cinco siglos de historia. Para ampliar información sin compromiso: teléfono 689735353 o bien al correo electrónico: convento@viviendasingular.es Twittear Sale a la venta una vivienda dentro de un convento del siglo XVI Comunicae miércoles, 10 de mayo de 2023, 16:50 h (CET) La empresa Firenze Resurgo S.L. recibe el encargo de promocionar la venta de una vivienda singular situada dentro del Claustro de un Convento del siglo XVI. En palabras de su Socio Director Juan Carlos Romero Muñoz: "el singular inmueble permite disfrutar en pleno siglo XXI de todos los avances tecnológicos y combinarlos con más de 500 años de historia de una vivienda, situada dentro del claustro de un antiguo convento en la falda de los Montes de la Sierra de Gredos" Un inmueble singular y privilegiado con carácter propio Posiblemente entorno al año 1507, se funda el Convento de las Monjas en la actual localidad de Aldeanueva de Santa Cruz. Un Convento de religiosas de la Orden de Santo Domingo. Ni qué decir tiene, que más de 500 años de historia dan para mucho, y que en todo ese tiempo el Convento atravesó momentos álgidos y otros menos halagüeños. Un incendio originado en el Convento en el año 1565 devoró buena parte del inmueble mandándose reedificar posteriormente, y llegando hasta hoy restos que proceden de dicha reedificación. Ya en el siglo XVIII, muy probablemente al calor de las sucesivas desamortizaciones de Mendizábal, durante los años 1833 al 1866 se tabican determinadas estancias y se venden como viviendas privadas a particulares. Y hoy, en pleno siglo XXI, sigue brillando con especial belleza el conjunto Convento de las Monjas de Aldeanueva de Santa Cruz, con mención a las entradas al mismo y Claustro del Convento, donde se ubica el inmueble que se presenta. El acceso a la vivienda se efectúa mediante unas escaleras situadas en el mismo Claustro del Convento, dado paso a la primera planta del inmueble. Con vistas a la Sierra de Gredos y al Claustro del Convento, se puede disfrutar de la tranquilidad de este maravilloso enclave abulense. La cercanía a poblaciones como Piedrahita, Barco de Ávila o inclusive el Valle del Jerte, a tan sólo 20 minutos en coche, hacen posible planificar atractivas rutas turísticas en las que mezclar naturaleza y gastronomía con historia y tradición castellana. Nuevas tecnologías mezcladas con elementos del siglo XVI Son muchas las cualidades por las que este inmueble destaca, pero entre todas ellas quizá la más impactante sería la mezcla de elementos arquitectónicos históricos con nuevas tecnologías. Disfrutar navegando por Internet con fibra o inclusive mantener un sistema de videovigilancia con alarma activa entre muros de piedra que rebosan belleza, historias, serenidad y tranquilidad, hacen que el espacio sea confortable, acogedor, único, dentro de un ambiente mágico. Una propiedad privada absolutamente reformada, con un carácter propio forjado durante más de 500 años de historia, impregnada de una atmosfera singular y única que evoca la espiritualidad de siglos pasados. La vivienda tiene 200 m2 construidos y repartidos en dos plantas, cinco grandes habitaciones, salón, cocina, cuarto de baño y aseo. El lugar ideal para poder vivir todo el año o inclusive como segunda residencia para teletrabajar, gracias a la instalación de fibra óptica disponible y disfrutar de la comodidad, belleza y elegancia de algo único. La amplitud del inmueble permite desde un taller de pintura, pasando por una sala de juegos, o de teletrabajo, o espacio para practicar yoga, meditar y relajarse en un lugar acogedor y de una gran belleza. Una ocasión irrepetible para invertir en un inmueble único La venta de esta propiedad supone también una oportunidad de inversión en un inmueble único, por sus especiales características, su importancia histórica, así como por la localización geográfica a tan sólo dos horas de Madrid, poco más de una hora desde Salamanca o una hora desde Ávila capital aproximadamente. Con un precio de 290.000 euros, impuestos no incluidos, se puede ser propietario de este singular inmueble en pleno corazón de la Sierra de Gredos, disfrutando de una exclusiva y singular casa rural de más de cinco siglos de historia. Para ampliar información sin compromiso: teléfono 689735353 o bien al correo electrónico: convento@viviendasingular.es',
				url: "https://www.diariosigloxxi.com/texto-diario/mostrar/4285527/sale-venta-vivienda-dentro-convento-siglo-xvi",
				image: "http://www.diariosigloxxi.com/images/20537",
				publish_date: "2023-05-10 18:54:03",
				author: "Comunicae",
				language: "es",
				source_country: "es",
			},
			{
				id: 126066502,
				title: "Mejorar las ventas de alojamientos de la mano de ISholidays.com",
				text: "Mejorar las ventas de alojamientos de la mano de ISholidays.com Archivado en: Negocios Emprendedores de Hoy | viernes, 7 de julio de 2023, 10:00 Lograr vender una propiedad a buen precio y de forma rápida no es una labor sencilla para los propietarios, tomando en cuenta la alta oferta de inmuebles en venta y alquiler que hay en el mercado inmobiliario. Debido a esto, se hace necesario poner en práctica una serie de acciones para atraer posibles clientes interesados en el inmueble. Empresas especializadas en alquiler vacacional como isholidays.com brinda mayor información sobre cómo mejorar las ventas de alojamientos. Recomendaciones para acelerar las ventas de un inmueble Los profesionales de la firma destacan que entre los puntos claves para vender un inmueble es el precio. Cuanto más justo y cercano esté a su valor, más atractivo será para los clientes. Para eso, es necesario analizar el precio de inmueble en el mercado, tomando en cuenta la ubicación y su extensión. Otro de los aspectos relevantes a considerar es la imagen del inmueble. Es importante que el mismo esté bien arreglado, limpio y sin daños estructurales al momento de promocionarlo para la venta o el alquiler, ya que es la primera impresión que se llevarán los clientes de la propiedad. También, es importante tener la documentación legal de la vivienda al día, cerciorándose que el inmueble esté libre de hipotecas o tenga algún tipo de deuda. Finalmente, solicitar ayuda inmobiliaria es una gran idea cuando no se tiene tiempo para atender los aspectos antes mencionados o se requiere vender o alquilar en inmueble en el menor tiempo posible. Ventajas de contar con un asesoramiento inmobiliario Muchos propietarios interesados en vender un inmueble miran la posibilidad de hacerlo de forma particular para ahorrarse algo de dinero. No obstante, cuando están en el proceso, se dan cuenta de que la gestión es más compleja de lo que pensaban, por lo que, en ocasiones, terminan bajando el precio del inmueble para dar por finalizado el proceso. Para evitar malvender una propiedad, es recomendable contar con un equipo de asesores inmobiliarios, ya que estos tienen la experiencia y los conocimientos precisos para negociar el inmueble de manera efectiva y en el menor tiempo posible. Además, son expertos en tasar propiedades y, por lo general, cuentan con una amplia cartera de clientes, interesados en adquirir propiedades. ISholidays.com tiene una experiencia de 14 años en el sector inmobiliario ayudando a sus clientes a vender sus propiedades sin dolores de cabeza y con la mejor tasación del mercado. Sus servicios abarcan la gestión de inmuebles en diversos puntos de España como Mallorca, Tenerife, Ibiza, Málaga, entre otras localidades. Adicionalmente, disponen de un portal inmobiliario online, en el cual promocionan los inmuebles de sus clientes, detallando aspectos como la ubicación de la vivienda, servicios y precios. También, añaden fotografías de buena calidad de las propiedades que resaltan los atributos de estas de cara a los clientes. En definitiva, apoyarse de profesionales inmobiliarios es una alternativa segura y eficaz para vender o alquilar una propiedad sin tener que pasar por situaciones de estrés o procesos burocráticos que retrasan la venta, lo que trae consigo mayor tranquilidad para los propietarios. Twittear Mejorar las ventas de alojamientos de la mano de ISholidays.com Emprendedores de Hoy viernes, 7 de julio de 2023, 10:00 h (CET) Lograr vender una propiedad a buen precio y de forma rápida no es una labor sencilla para los propietarios, tomando en cuenta la alta oferta de inmuebles en venta y alquiler que hay en el mercado inmobiliario. Debido a esto, se hace necesario poner en práctica una serie de acciones para atraer posibles clientes interesados en el inmueble. Empresas especializadas en alquiler vacacional como isholidays.com brinda mayor información sobre cómo mejorar las ventas de alojamientos. Recomendaciones para acelerar las ventas de un inmueble Los profesionales de la firma destacan que entre los puntos claves para vender un inmueble es el precio. Cuanto más justo y cercano esté a su valor, más atractivo será para los clientes. Para eso, es necesario analizar el precio de inmueble en el mercado, tomando en cuenta la ubicación y su extensión. Otro de los aspectos relevantes a considerar es la imagen del inmueble. Es importante que el mismo esté bien arreglado, limpio y sin daños estructurales al momento de promocionarlo para la venta o el alquiler, ya que es la primera impresión que se llevarán los clientes de la propiedad. También, es importante tener la documentación legal de la vivienda al día, cerciorándose que el inmueble esté libre de hipotecas o tenga algún tipo de deuda. Finalmente, solicitar ayuda inmobiliaria es una gran idea cuando no se tiene tiempo para atender los aspectos antes mencionados o se requiere vender o alquilar en inmueble en el menor tiempo posible. Ventajas de contar con un asesoramiento inmobiliario Muchos propietarios interesados en vender un inmueble miran la posibilidad de hacerlo de forma particular para ahorrarse algo de dinero. No obstante, cuando están en el proceso, se dan cuenta de que la gestión es más compleja de lo que pensaban, por lo que, en ocasiones, terminan bajando el precio del inmueble para dar por finalizado el proceso. Para evitar malvender una propiedad, es recomendable contar con un equipo de asesores inmobiliarios, ya que estos tienen la experiencia y los conocimientos precisos para negociar el inmueble de manera efectiva y en el menor tiempo posible. Además, son expertos en tasar propiedades y, por lo general, cuentan con una amplia cartera de clientes, interesados en adquirir propiedades. ISholidays.com tiene una experiencia de 14 años en el sector inmobiliario ayudando a sus clientes a vender sus propiedades sin dolores de cabeza y con la mejor tasación del mercado. Sus servicios abarcan la gestión de inmuebles en diversos puntos de España como Mallorca, Tenerife, Ibiza, Málaga, entre otras localidades. Adicionalmente, disponen de un portal inmobiliario online, en el cual promocionan los inmuebles de sus clientes, detallando aspectos como la ubicación de la vivienda, servicios y precios. También, añaden fotografías de buena calidad de las propiedades que resaltan los atributos de estas de cara a los clientes. En definitiva, apoyarse de profesionales inmobiliarios es una alternativa segura y eficaz para vender o alquilar una propiedad sin tener que pasar por situaciones de estrés o procesos burocráticos que retrasan la venta, lo que trae consigo mayor tranquilidad para los propietarios.",
				url: "https://www.diariosigloxxi.com/texto-diario/mostrar/4361445/mejorar-ventas-alojamientos-mano-isholidayscom",
				image: "http://www.diariosigloxxi.com/images/showid/6047157",
				publish_date: "2023-07-07 10:00:00",
				author: "Emprendedores de Hoy",
				language: "es",
				source_country: "es",
			},
		]);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email !== "" && password !== "") {
			setIniciando(true);
		}
	};

	return (
		<MainLayout>
			<div className="login-form">
				<section>
					<form onSubmit={handleSubmit}>
						{error !== "" ? (
							<div className="input-field error">
								<p>{error}</p>
							</div>
						) : (
							<></>
						)}
						<h2>Inicia sesión</h2>
						<div className="input-field">
							<label htmlFor="correo">Correo:</label>
							<input
								type="text"
								id="correo"
								placeholder="example@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="input-field">
							<label htmlFor="password">Contraseña:</label>
							<input
								type="password"
								id="password"
								placeholder="********"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<p>
							¿Todavia no tienes cuenta?{" "}
							<Link to="/register">Registrate</Link>
						</p>
						{iniciando ? <div className="spinner"></div> : <></>}
						<input
							type="submit"
							className="submit-btn page-button"
							value="Enviar"
						/>
					</form>
				</section>
				<div className="curious-data">
					{news.map((neww) => {
						return (
							<div className="card" key={neww.id}>
								<div className="header-card-img">
									<img
										src={neww.image}
										alt="imagen noticia"
									/>
									<h3>{neww.title}</h3>
								</div>
								<p>{neww.text}</p>
								<div className="date-autor-new">
									<h5>{neww.author}</h5>
									<p>
										{formatReadableDate(neww.publish_date)}
									</p>
								</div>
								<a
									href={neww.url}
									target="_blank"
									rel="noopener noreferrer">
									Read more
								</a>
							</div>
						);
					})}
				</div>
			</div>
		</MainLayout>
	);
}

export default Login;
