const express = require('express');
const multer = require('multer'); //Package used for extracting files from requests
const PostModel = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, cbFunction) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mimeType');
        if (isValid) {
            error = null;
        }
        cbFunction(error, 'backend/images');
    },
    filename: (req, file, cbFunction) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cbFunction(null, name + '-' + Date.now() + '.' + ext)
    }
});

router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        timeCreated: parseInt(req.body.timeCreated),
        updated: parseInt(req.body.updated),
        imagePath: url + '/images/' + req.file.filename
    });
    post.save().then((result) => {
        res.status(201).json({
            message: 'Post Added Successfully',
            post: result,
        });
    });
});

router.get('', (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    let fetchedPosts;
    const postQuery = PostModel.find();

    if (pageSize > 0 && currentPage >= 0) {
        postQuery
            .skip(pageSize * (currentPage === 0 ? 0 : currentPage))
            .limit(pageSize);
    }
    postQuery.then((documents) => {
        fetchedPosts = documents;
        return PostModel.countDocuments(); // Return how many posts are in the collection
    })
        .then(count => {
            res.status(200).json({
                message: 'Posts fetched successfully',
                posts: fetchedPosts,
                maxPosts: count
            });
        });

});

router.patch('/:id', multer({storage: storage}).single('image'), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new PostModel({
        ...req.body,
        imagePath: imagePath
    });
    PostModel.updateOne({_id: req.params.id}, post)
        .then(() => {
            const newPost = {
                id: post._id,
                title: post.title,
                content: post.content,
                timeCreated: post.timeCreated,
                updated: post.updated,
                imagePath: post.imagePath
            };
            res.status(200).json({
                message: 'Update Successful',
                post: newPost
            })
        })
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
