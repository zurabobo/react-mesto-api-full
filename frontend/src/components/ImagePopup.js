import React from 'react';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <Modal
      isOpen={isOpen}
      className="popup__container popup__container_type_full-image"
      overlayClassName={`popup popup_type_full-image ${card && isOpen ? 'popup_opened' : null}`}
      closeTimeoutMS={250}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
          <img className="popup__full-image" src={card?.link} alt={card?.name} />
          <button className="popup__close-button button-opacity" type="button" onClick={onClose}></button>
          <h3 className="popup__full-image-heading">{card ? card.name : ''}</h3>    
    </Modal>
  )
}

export default ImagePopup;