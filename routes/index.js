const express = require('express');
const { welcomeMessage, users } = require('../controllers/index');

const router = express.Router();

router.get('/', welcomeMessage)
    .get('/users', users);

module.exports = router;
