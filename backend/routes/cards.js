const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.post('/', ...createCard);
router.put('/:cardId/likes', ...addCardLike);
router.delete('/:cardId/likes', ...deleteCardLike);
router.delete('/:cardId', ...deleteCard);

module.exports = router;
