const Card = require('../models/card');
const BadReqError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadReqError('Переданы некорректные данные при создании карточки');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('NotFound'))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      } else {
        Card.findByIdAndDelete(req.params.cardId)
          .then((deleteCard) => {
            res.status(200).send(deleteCard);
          });
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('переданы некорректные данные');
      }
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadReqError('переданы некорректные данные');
      }
      if (err.message === 'NotValidId') {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
    })
    .catch(next);
};
