const bcryptjs = require('bcryptjs'); // Package used for hashing/encrypting/comparing passwords
const jwt = require('jsonwebtoken'); // Package used for creating JWT

const AuthModel = require('../models/auth');

exports.authSignUp =  (req, res, next) => {
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
};

exports.authLogin =  (req, res, next) => {
    let fetchedUser;
    AuthModel.findOne({email: req.body.email})
        .then(user => {
            if (!user) {
                throw new Error('Email address not found.')
            }
            fetchedUser = user;
            return bcryptjs.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                throw new Error('Invalid Password')
            }
            const token = jwt.sign(
                {email: fetchedUser.email, userId: fetchedUser._id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );
            res.status(200).json({
                message: 'Authentication Successful',
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            })
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication Failed'
            })
        })
};
