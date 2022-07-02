import successIcon from '../images/sing-up-success.svg'
import failIcon from '../images/sing-up-failed.svg'

import Modal from 'react-modal';
Modal.setAppElement('#root');

function InfoTooltip( {isOpen, onClose, isSuccess} ) {
  const icon = isSuccess ? successIcon : failIcon;
  const alt = isSuccess ? 'иконка успешной регистрации' : 'иконка не успешной регистрации';
  const infoTooltipTitle = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.';

  return (
    <Modal
      isOpen={isOpen}
      className='popup__container popup__container_type_infotooltip'
      overlayClassName={`popup ${(isOpen) ? 'popup_opened' : ''}`}
      closeTimeoutMS={250}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
    >
    <button className="popup__close-button button-opacity" type="button" onClick={onClose}></button>
      <img className="popup__infotooltip-icon"
        src={icon}
        alt={alt}
      />
      <h3 className="popup__infotooltip-title">
        {infoTooltipTitle}
      </h3>
    </Modal>
  )
}

export default InfoTooltip;
