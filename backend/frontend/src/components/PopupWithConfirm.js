import PopupWithForm from './PopupWithForm';

function PopupWithConfirm({ title, buttonTitle, isOpen, onClose, onSubmit }) {

    
  return (
    <PopupWithForm
      name="confirm"
      title={title}
      buttonTitle={buttonTitle}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  )
}

export default PopupWithConfirm;