const express = require('express');
const bcryptjs = require('bcryptjs'); // Holds bcryptjs package that aids in encrypting/hashing
const router = express.Router();

const AuthModel = require('../models/auth');


router.post("/signup", (req, req, next) => {
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
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        })
});

module.exports = router;
