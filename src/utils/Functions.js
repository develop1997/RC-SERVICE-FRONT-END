/** @format */

import axios from "axios";

export function formatReadableDate(dateString) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	const date = new Date(dateString);
	return date.toLocaleString("es-ES", options);
}

export const randomSixDigitNumber = () => {
	const min = 100000;
	const max = 999999;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isValidPassword = (password) => {
	const passwordPattern =
		/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return passwordPattern.test(password);
};

export function obtenerDosValoresAleatorios(matriz) {
	let indiceAleatorio1 = Math.floor(Math.random() * matriz.length);
	let indiceAleatorio2 = Math.floor(Math.random() * matriz.length);

	while (indiceAleatorio2 === indiceAleatorio1) {
		indiceAleatorio2 = Math.floor(Math.random() * matriz.length);
	}

	const valorAleatorio1 = matriz[indiceAleatorio1];
	const valorAleatorio2 = matriz[indiceAleatorio2];

	return [valorAleatorio1, valorAleatorio2];
}

export function verificarNumeroWhatsApp(numero) {
	const numeroLimpio = numero.replace(/\s/g, "");
	if (numeroLimpio.startsWith("+")) {
		return false;
	}
	if (!/^\d+$/.test(numeroLimpio)) {
		return false;
	}
	if (numeroLimpio.length < 8 || numeroLimpio.length > 15) {
		return false;
	}
	return true;
}

export function formatearCorreo(correo) {
	var correoFormateado;
	if (correo.length > 15) {
		correoFormateado = correo.substring(0, 15) + "...";
	} else {
		correoFormateado = correo;
	}
	return correoFormateado;
}

export function getSesion() {
	const sessionCookie = document.cookie
		.split("; ")
		.find((row) => row.startsWith("sessionToken="));
	if (sessionCookie) {
		return sessionCookie.split("=")[1];
	}
	return undefined;
}

export async function translateString(inputString) {
	const sourceLanguage = "en";
	const targetLanguage = "es";

	try {
		const response = await axios.get(
			`https://api.mymemory.translated.net/get?q=${encodeURIComponent(
				inputString
			)}&langpair=${sourceLanguage}|${targetLanguage}`
		);

		const translatedText =
			response.data.responseData.translatedText || inputString;
		return translatedText;
	} catch (error) {
		console.error("Error translating:", error);
		return inputString;
	}
}
