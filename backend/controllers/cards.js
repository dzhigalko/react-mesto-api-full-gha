const { celebrate, Joi } = require('celebrate');
const Card = require('../models/card');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForbiddenError');
const constants = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = [
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(constants.UrlRegex),
    }),
  }),
  (req, res, next) => {
    const { name, link } = req.body;
    const { _id: userId } = req.user;

    Card.create({ name, link, owner: userId })
      .then((card) => {
        res.status(constants.HTTP_CREATED).send(card);
      })
      .catch(next);
  },
];

const deleteCard = [
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  (req, res, next) => {
    const { cardId } = req.params;
    const { _id: userId } = req.user;

    Card.findById(cardId)
      .orFail(() => new NotFoundError('Card not found'))
      .then((card) => {
        if (card.owner.toString() !== userId) {
          return Promise.reject(new ForbiddenError('User doesn\'t have access to delete card'));
        }

        return card;
      })
      .then((card) => Card.deleteOne(card))
      .then((card) => res.send(card))
      .catch(next);
  },
];

const addCardLike = [
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  (req, res, next) => {
    const { cardId } = req.params;
    const { _id: userId } = req.user;

    Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
      { new: true },
    )
      .orFail(() => new NotFoundError('Card not found'))
      .then((card) => {
        res.send(card);
      }).catch(next);
  },
];

const deleteCardLike = [
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }),
  (req, res, next) => {
    const { cardId } = req.params;
    const { _id: userId } = req.user;

    Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } }, // добавить _id в массив, если его там нет
      { new: true },
    )
      .orFail(() => new NotFoundError('Card not found'))
      .then((card) => {
        res.send(card);
      }).catch(next);
  },
];

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
};
