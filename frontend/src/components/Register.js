import { useFormValidation } from '../hooks/useFormValidation';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegistration }) {

    const {
        values,
        errors,
        isValid,
        handleChange,
    } = useFormValidation({});

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegistration(values);
    }

    return (
        <AuthForm
            title="Регистрация"
            buttonTitle="Зарегистрироваться"
            isValid={isValid}
            onSubmit={handleSubmit}
        >
            <input className="popup__form-text popup__form-text_theme_dark"
                type="email" name="email" value={values.email || ''} onChange={handleChange} id="login-email" placeholder="Email:"
                required />
            <span className={errors.email ? "popup__form-text-error  popup__form-text-error_visible" : "popup__form-text-error"}
                id="login-email-error">{errors.email}</span>
            <input className="popup__form-text popup__form-text_theme_dark"
                type="password" name="password" onChange={handleChange} id="login-password" placeholder="Пароль:"
                value={values.password || ''} required />
            <span className={errors.password ? "popup__form-text-error  popup__form-text-error_visible" : "popup__form-text-error"}>{errors.password}</span>
            <p className="popup__form-paragraph">Уже зарегистрированы? <Link to="/sign-in" className="popup__form-link">Войти</Link></p>
        </AuthForm>
    )
}

export default Register;
