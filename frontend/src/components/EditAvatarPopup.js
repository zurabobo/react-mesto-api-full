import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';

import { useFormValidation } from '../hooks/useFormValidation';


function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, isLoadingData }) {
    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    } = useFormValidation({});

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        onUpdateAvatar(values);
    }

    useEffect(() => {
        resetForm();
    }, [isOpen, resetForm])

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            isLoadingData={isLoadingData}
            isDisabled={!isValid}
            onSubmit={handleSubmit}
            buttonTitle="Сохранить"
            name="avatarForm"
            title="Обновить аватар">
            <input className={errors.avatar ? "popup__form-text popup__form-text_type_error" : "popup__form-text"}
                placeholder="Ссылка на картинку" type="url"
                name="avatar" id="avatar-url-input" required
                value={values.avatar || ''}
                onChange={handleChange} />
            <span className={errors.avatar ? "popup__form-text-error popup__form-text-error_visible" : "popup__form-text-error"}>{errors.avatar}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;