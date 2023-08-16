/** @format */

import "./Modal.css";

const Modal = ({ isOpen, onClose, title, message }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className="modal-overlay">
			<div className="modal">
				<h2>{title}</h2>
				<p>{message}</p>
				<div className="button-container-modal-only">
					<button
						className="page-button"
						onClick={onClose}>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
