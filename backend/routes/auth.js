const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');

router.post("/signup", authControllers.authSignUp);

router.post("/login", authControllers.authLogin);

module.exports = router;
