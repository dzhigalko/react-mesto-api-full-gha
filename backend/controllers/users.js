const jwt = require('jsonwebtoken');
const { celebrate, Joi } = require('celebrate');
const User = require('../models/user');
const NotFoundError = require('../utils/NotFoundError');
const constants = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = [
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(constants.UrlRegex),
    }),
  }),
  (req, res, next) => {
    const {
      name, about, avatar, email, password,
    } = req.body;

    User.create({
      name, about, avatar, email, password,
    })
      .then((user) => {
        const userObject = user.toObject();
        delete userObject.password;

        res.status(constants.HTTP_CREATED).send(userObject);
      })
      .catch(next);
  },
];

const getUser = [
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
      .orFail(() => new NotFoundError('User not found'))
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },
];

const updateCurrentUser = [
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  (req, res, next) => {
    const { _id: userId } = req.user;
    const { name, about } = req.body;

    User.findByIdAndUpdate(userId, { name, about }, { runValidators: true, new: true })
      .orFail(() => new NotFoundError('User not found'))
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },
];

const updateCurrentUserAvatar = [
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(constants.UrlRegex),
    }),
  }),
  (req, res, next) => {
    const { _id: userId } = req.user;
    const { avatar } = req.body;

    User.findByIdAndUpdate(userId, { avatar }, { runValidators: true, new: true })
      .orFail(() => new NotFoundError('User not found'))
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },
];

const login = [
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  (req, res, next) => {
    const { jwtSecret, jwtTTL } = req;
    const { email, password } = req.body;

    User.authenticate(email, password)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: jwtTTL });
        res.send({ token });
      })
      .catch(next);
  },
];

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
  login,
  getCurrentUser,
};
