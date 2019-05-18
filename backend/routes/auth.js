const express = require('express');
const bcryptjs = require('bcryptjs'); // Holds bcryptjs package that aids in encrypting/hashing
const jwt = require('jsonwebtoken');
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

router.post("/login", (req, res, next) => {
    let fetchedUser;
    AuthModel.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication Failed'
                })
            }
            fetchedUser = user;
            return bcryptjs.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Authentication Failed'
                })
            }
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id},
                'secret_this_should_be_longer',
                {expiresIn: '1h'}
            );
            res.status(200).json({
                message: 'Authentication Successful',
                token: token
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication Failed'
            })
        })
});

module.exports = router;
