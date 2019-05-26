const express = require('express');
const multer = require('multer'); //Package used for extracting files from requests
const checkAuth = require('../middleware/check-auth');
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

router.post(
    '',
    checkAuth,
    multer({storage: storage}).single('image'),
    (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        timeCreated: parseInt(req.body.timeCreated),
        updated: parseInt(req.body.updated),
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId // Information returned from the checkAuth middleware holds the token information
    });
    post.save().then((result) => {
        res.status(201).json({
            message: 'Post Added Successfully',
            post: result,
        });
    });
});

router.get(
    '',
    (req, res, next) => {
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

router.patch(
    '/:id',
    checkAuth, //Checks the token and returns data inside
    multer({storage: storage}).single('image'),
    (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new PostModel({
        ...req.body,
        imagePath: imagePath
    });
    PostModel.updateOne({_id: req.params.id, creator: req.userData.userId}, post)
        .then((result) => {
            if(result.nModified > 0) {
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
            } else {
                res.status(401).json({
                    message: 'Not Authorised',
                    post: null
                })
            }
        })
});

router.delete(
    '/:id',
    checkAuth,
    (req, res, next) => {
    PostModel.deleteOne({_id: req.params.id, creator: req.userData.userId})
        .then((result) => {
            if(result.n > 0) {
                res.status(200).json({
                    message: 'Post Deleted',
                    postId: req.params.id
                });
            } else {
                res.status(401).json({
                    message: 'Not Authorized'
                })
            }
        });
});

module.exports = router;
