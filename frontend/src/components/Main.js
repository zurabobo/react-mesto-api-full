import { useContext } from 'react';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDeleteConfirm }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button button-opacity" onClick={onEditProfile}></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button button-opacity" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="cards" aria-label="карточки">
        {cards.map(card =>
          <Card card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteConfirm={onCardDeleteConfirm} />)}
      </section>

    </main>
  );
}

export default Main;