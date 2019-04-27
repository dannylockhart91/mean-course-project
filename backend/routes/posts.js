const express = require('express');
const PostModel = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        timeCreated: Date.now(),
        updated: req.body.updated
    });
    post.save().then((result) => {
        res.status(201).json({
            message: 'Post Added Successfully',
            post: result,
        });
    });
});

router.get('', (req, res, next) => {
    PostModel.find()
        .then((documents) => {
            console.log(documents);
            res.status(200).json({
                message: 'Posts fetched successfully',
                posts: documents
            });
        });
});

router.patch('/:id', (req, res, next) => {
    PostModel.updateOne({_id: req.params.id}, req.body)
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: 'Update Successful',
                post: req.body
            })
        })
        .catch()
});

router.delete('/:id', (req, res, next) => {
    PostModel.deleteOne({_id: req.params.id})
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: 'Post Deleted'
            });
        });
});

module.exports = router;
