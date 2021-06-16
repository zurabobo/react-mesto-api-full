import PopupWithForm from './PopupWithForm';
import { useEffect } from 'react';

import { useFormValidation } from '../hooks/useFormValidation';

function AddPlacePopup({ onAddPlace, isOpen, onClose, isLoadingData, }) {

    const {
        values,
        errors,
        isValid,
        handleChange,
        resetForm
    } = useFormValidation({});

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        onAddPlace(values);
    }

    useEffect(() => {
        resetForm();
    }, [isOpen, resetForm])

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            isLoadingData={isLoadingData}
            onSubmit={handleSubmit}
            isDisabled={!isValid}
            buttonTitle="Создать"
            name="cardForm"
            title="Новое место">
            <input className={errors.name ? "popup__form-text popup__form-text_type_error" : "popup__form-text"}
                placeholder="Название" type="text"
                name="name" id="card-heading-input" minLength="1" maxLength="30"
                value={values.name || ''} required onChange={handleChange} />
            <span className={errors.name ? "popup__form-text-error  popup__form-text-error_visible" : "popup__form-text-error"}
                id="card-heading-input-error">{errors.name}</span>
            <input className={errors.link ? "popup__form-text popup__form-text_type_error" : "popup__form-text"}
                placeholder="Ссылка на картинку" type="url"
                name="link" id="card-link-input" value={values.link || ''} required onChange={handleChange} />
            <span className={errors.link ? "popup__form-text-error popup__form-text-error_visible" : "popup__form-text-error"}
                id="card-link-input-error">{errors.link}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;