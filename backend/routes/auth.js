const express = require('express');
const bcryptjs = require('bcryptjs'); // Holds bcryptjs package that aids in encrypting/hashing
const router = express.Router();

const AuthModel = require('../models/auth');


router.post("/signup", (req, res, next) => {
    bcryptjs.hash(req.body.password, 10) // Hash the password
        .then(hash => {
            const user = new AuthModel({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User Created.',
                        data: result
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Failed to create user.',
                        data: error
                    })
                })
        })
});

module.exports = router;
