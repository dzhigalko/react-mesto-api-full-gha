const express = require('express');
const {
  getUsers,
  getUser,
  updateCurrentUser,
  updateCurrentUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', ...getUser);
router.patch('/me/avatar', ...updateCurrentUserAvatar);
router.patch('/me', ...updateCurrentUser);

module.exports = router;
