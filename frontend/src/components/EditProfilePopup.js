import PopupWithForm from './PopupWithForm';
import { useEffect, useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { useFormValidation } from '../hooks/useFormValidation';

function EditProfilePopup({ onUpdateUser, isOpen, handleUpdateUser, onClose, isLoadingData }) {

    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    } = useFormValidation({});

    const currentUser = useContext(CurrentUserContext);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser(values);
    }

    useEffect(() => {
        if (currentUser) {
            resetForm(currentUser);
        }
    }, [currentUser, resetForm, isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onUpdateUser={handleUpdateUser}
            onClose={onClose}
            isLoadingData={isLoadingData}
            onSubmit={handleSubmit}
            isDisabled={!isValid}
            buttonTitle="Сохранить"
            name="profileForm"
            title="Редактировать профиль">
            <input className={errors.name ? "popup__form-text popup__form-text_type_error" : "popup__form-text"}
                type="text" name="name" value={values.name || ''} onChange={handleChange} id="name-input" placeholder="Имя"
                minLength="2" maxLength="40" required />
            <span className={errors.name ? "popup__form-text-error  popup__form-text-error_visible" : "popup__form-text-error"}
                id="name-input-error">{errors.name}</span>
            <input className={errors.about ? "popup__form-text popup__form-text_type_error" : "popup__form-text"}
                type="text" name="about" onChange={handleChange} id="about-input" placeholder="О себе"
                minLength="2" maxLength="200" value={values.about || ''} required />
            <span className={errors.about ? "popup__form-text-error  popup__form-text-error_visible" : "popup__form-text-error"}>{errors.about}</span>
        </PopupWithForm>
    )
}


export default EditProfilePopup;
