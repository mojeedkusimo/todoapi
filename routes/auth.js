const express = require('express');
const { signup, login } = require('../controllers/auth');

const router = express.Router();
router.post('/signup', signup)
	.post('/login', login)
module.exports = router;
