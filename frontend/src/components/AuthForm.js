function AuthForm({ title, buttonTitle, isValid, onSubmit, children }) {
    return (

        <div className="popup__container popup__container_theme_dark">
            <h2 className="popup__heading popup__heading_theme_dark">{title}</h2>
            <form className="popup__form" onSubmit={onSubmit} noValidate>
                <fieldset className="popup__form-container">
                    {children}
                    <button className={!isValid ? "popup__form-btn popup__form-btn_theme_dark popup__form-btn_disabled" : "popup__form-btn popup__form-btn_theme_dark button-opacity"}
                        type="submit"
                        disabled={!isValid}>
                        {buttonTitle}
                    </button>
                </fieldset>
            </form>
        </div>

    )
}

export default AuthForm;
