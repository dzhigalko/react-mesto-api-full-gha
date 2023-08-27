const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserNotFoundError = require('../utils/UserNotFoundError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Длина поля "name" должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля "name" должна быть меньше 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Длина поля "about" должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля "about" должна быть меньше 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: validator.isURL,
      message: (props) => `${props.value} не является URL`,
    },
  },
  email: {
    type: String,
    unique: [true, 'Пользователь с email {VALUE} уже существует'],
    required: [true, 'Поле "email" является обязательным'],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} не является email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" является обязательным'],
    select: false,
  },
}, { versionKey: false });

const hashPassword = (password) => bcrypt.genSalt(10)
  .then((salt) => bcrypt.hash(password, salt));

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return hashPassword(user.password)
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch(next);
});

// eslint-disable-next-line func-names
userSchema.statics.authenticate = function (email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => new UserNotFoundError(`Пользователь с email ${email} не найден или неверный пароль`))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UserNotFoundError(`Пользователь с email ${email} не найден или неверный пароль`));
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
