const express = require('express');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file-handler');

const postControllers = require('../controllers/posts');

const router = express.Router();


router.post(
    '',
    checkAuth,
    extractFile,
    postControllers.addPost);

router.get(
    '',
    postControllers.getPosts);

router.patch(
    '/:id',
    checkAuth, //Checks the token and returns data inside
    extractFile,
    postControllers.updatePost);

router.delete(
    '/:id',
    checkAuth,
    postControllers.deletePost);

module.exports = router;
