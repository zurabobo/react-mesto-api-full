import headerLogo from '../images/header-logo.svg';
import { NavLink, useLocation } from 'react-router-dom';

function Header({ loggedIn, onSingOut, userEmail }) {

  const location = useLocation();

  return (
    <header className={loggedIn ? "header header_row-reverse" : "header"}>
        <img alt="логотип mesto" className="header__logo" src={headerLogo} />
        {!loggedIn &&
          (<nav>
            {location.pathname === "/sign-in" && (<NavLink className="header__navlink" to="/sign-up">Регистрация</NavLink>)}
            {location.pathname === "/sign-up" && (<NavLink className="header__navlink" to="/sign-in">Войти</NavLink>)}
          </nav>
          )
        }
      {loggedIn &&
        (
          <div className="header__container">
            <p className="header__email-address">{userEmail}</p>
            <button className="header__logout-btn" type="button" onClick={onSingOut}>Выйти</button>
          </div>
        )
      }
    </header>
  )
}

export default Header;