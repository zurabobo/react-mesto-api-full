import AuthForm from './AuthForm';

import { useFormValidation } from '../hooks/useFormValidation';

function Login({ onLogin }) {

  const {
    values,
    errors,
    isValid,
    handleChange,
  } = useFormValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }

  return (
    <AuthForm
      title="Вход"
      buttonTitle="Войти"
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
    </AuthForm>
  )
}

export default Login;