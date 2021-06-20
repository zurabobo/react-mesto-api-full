import { useContext } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({ card, onCardClick, onCardDeleteConfirm, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  // const cardDeleteButtonClassName = isOwn ? 
  //   'card__delete-button button-opacity card__delete-button_visible' : 'card__delete-button button-opacity card__delete-button_hidden'
  // ;

  // const isLiked = card.likes.find(i => i._id === currentUser._id);
  // const cardLikeButtonClassName = isLiked ? 
  //   'card__like-button button-opacity card__like-button_active' : 'card__like-button button-opacity'
  // ;
  const cardDeleteButtonClassName = (
    `card__delete-button button-opacity ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__like-button button-opacity ${isLiked ? 'card__like-button_active' : 'card__like-button button-opacity'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDeleteConfirm() {
    onCardDeleteConfirm(card);
  }

  return (

    <article className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDeleteConfirm}></button>
      <div className="card__container">
        <h3 className="card__heading">{card.name}</h3>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="card__like-count">{card.likes.length}</span>
        </div>
      </div>
    </article>

  )
}

export default Card;