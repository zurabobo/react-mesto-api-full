import { useState, useEffect, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithConfirm from './PopupWithConfirm';
import auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

import { Spinner } from 'react-spinners-css';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isPopupWithConfirmOpen, setIsPopupWithConfirmOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cardForDelete, setCardForDelete] = useState({})

  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  const [isSuccessSignUp, setIsSuccessSignUp] = useState(false);

  const [token, setToken] = useState('');

  const history = useHistory();

  const handleCheckToken = useCallback(
    () => {
      setIsLoadingPage(true)
      const token = localStorage.getItem('jwt');

      if (token) {
        setToken(token);

      auth.checkToken(token)
        .then(
          (res) => {
            setLoggedIn(true);
            setUserEmail(res.email);
            history.push('/');
          })
        .catch((err) => { console.log(err) })
        .finally(() => {
          setIsLoadingPage(false)
        });
      }
    },
    [history]
  );

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleCheckToken();
    }
  }, [handleCheckToken])

  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      const token = localStorage.getItem('jwt');
      api.getAppData(token)
        .then((data) => {
          const [cardsData, userData] = data;
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false)
        });
      }
  }, [loggedIn])

  function handleCardLike(card, isLiked) {

    api.changeLikeCardStatus(card._id, isLiked, token)
      .then(
        (newCard) => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
        })
      .catch((err) => { console.log(err) })
  };

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(cardForDelete._id, token)
      .then(
        () => {
          setCards((cards) => cards.filter((elem) => elem._id !== cardForDelete._id));
          closeAllPopups();
        })
      .catch((err) => { console.log(err) })
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setImagePopupOpen(false);
    setIsPopupWithConfirmOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  function handleEditAvatarClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardDeleteConfirm(card) {
    setCardForDelete(card);
    setIsPopupWithConfirmOpen(true);
  }

  function handleInfoToolTipPopupOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data, token)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((err) => { console.log(err) })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setAvatar(data, token)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        })
      .catch((err) => { console.log(err) })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data, token)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          document.body.prepend(newCard);
          closeAllPopups();
        })
      .catch((err) => { console.log(err) })
      .finally(() => {
        setIsLoading(false)
      });
  }

  function handleRegistration(data) {
    auth.register(data)
      .then(
        () => {
          setIsSuccessSignUp(true);
          history.push('/sign-in')
        })
      .catch((err) => {
        console.log(err);
        setIsSuccessSignUp(false);
      })
      .finally(() => {
        handleInfoToolTipPopupOpen();
      });
  }

  function handleAuthorization(data) {
    auth.authorize(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        setToken(res.token);
        setUserEmail(data.email);
        history.push('/')
      })
      .catch((err) => { console.log(err) })
  }

  function handleSingOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setToken('');
    history.push('/sign-in');
  }

  if (isLoadingPage) {
    return (
      <div className="spinner">
      <Spinner className="spinner__container" color="white" size={150} />
      </div>
    )
  } else {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            loggedIn={loggedIn}
            onSingOut={handleSingOut}
            userEmail={userEmail}
          />
          <Switch>
            <Route path="/sign-up">
              <Register onRegistration={handleRegistration} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={handleAuthorization} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onCardClick={handleCardClick}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardLike={handleCardLike}
              onCardDeleteConfirm={handleCardDeleteConfirm}
              onClose={closeAllPopups}
            />
          </Switch>

          <Footer />

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoadingData={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoadingData={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoadingData={isLoading}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccessSignUp}
          />

          <PopupWithConfirm
            isOpen={isPopupWithConfirmOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            title="Вы уверены?"
            buttonTitle="Да"
          />

        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
