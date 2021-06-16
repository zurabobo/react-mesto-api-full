import React from 'react';

import Modal from 'react-modal';
Modal.setAppElement('#root');

function PopupWithForm({name, isOpen, title, onSubmit, onClose, children, isDisabled, isLoadingData, buttonTitle}) {
  return (
    
    <Modal
      isOpen={isOpen}
      className='popup__container'
      overlayClassName={`popup popup_type_${name} ${(isOpen) ? 'popup_opened' : ''}`}
      closeTimeoutMS={250}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >

        <button className="popup__close-button button-opacity" type="button" onClick={onClose}></button>
        <h2 className="popup__heading">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit} noValidate>
          <fieldset className="popup__form-container">
            {children}
            <button disabled={isDisabled}
              className={isDisabled ? "popup__form-btn popup__form-btn_disabled" : "popup__form-btn button-opacity"}
              type="submit" >
              {isLoadingData ? "Сохранение..." : buttonTitle}
            </button>
          </fieldset>
        </form>
    </Modal>
  )
}

export default PopupWithForm;