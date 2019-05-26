
const PostModel = require('../models/post');

exports.updatePost =
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
                if (result.nModified > 0) {
                    const newPost = {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        timeCreated: post.timeCreated,
                        updated: post.updated,
                        imagePath: post.imagePath,
                        creator: req.userData.userId
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
    };

exports.deletePost =
    (req, res, next) => {
        PostModel.deleteOne({_id: req.params.id, creator: req.userData.userId})
            .then((result) => {
                if (result.n > 0) {
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
    };

exports.getPosts =
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

    };

exports.addPost =
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
    }
