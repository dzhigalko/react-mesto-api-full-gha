const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" является обязательным'],
    minlength: [2, 'Длина поля "name" должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля "name" должна быть меньше 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" является обязательным'],
    validate: {
      validator: validator.isURL,
      message: (props) => `${props.value} не является URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" является обязательным'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: () => [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
