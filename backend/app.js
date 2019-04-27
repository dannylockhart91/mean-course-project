// Holds EXPRESS app
const express = require('express');
// Holds connection to database (MongoDB)
const mongoose = require('mongoose');

const PostModel = require('./models/post');

// returns the express app by executing the express function
const app = express();
// Create connection to database
//IMPORTANT: MongoDB: danny - 7Fq8YvA2PntcSCss
mongoose.connect('mongodb+srv://danny:7Fq8YvA2PntcSCss@cluster0-sls8z.mongodb.net/node-angular?retryWrites=true\n', {useNewUrlParser: true})
    .then(() => {
        console.log('Connected to Database')
    })
    .catch(() => {
        console.log('Connection Failed')
    });

// These act as 'middleware', a series of actions that act upon a request before
// calling 'next' to let the request continue it's journey

// Use to add a body parser to the express app. This extracts body data from
// incoming requests
app.user(express.json());
app.use(express.urlencoded());


//IMPORTANT: Prevent CORS (Cross-Origin Resource Sharing) error - Allow cross server communication
app.use((req, res, next) => {
    // Allow all domains to access (denoted with '*')
    res.setHeader("Access-Control-Allow-Origin",
        "*");
    // Allow communication with headers from the below
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    // Allow control from http words (get, delete, put etc)
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/posts', (req, res, next) => {
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

app.get('/api/posts', (req, res, next) => {
    PostModel.find()
        .then((documents) => {
            console.log(documents);
            res.status(200).json({
                message: 'Posts fetched successfully',
                posts: documents
            });
        });
});

app.patch('/api/posts/:id', (req, res, next) => {
    // const post = new PostModel({
    //     title: req.body.title,
    //     content: req.body.content,
    //     updated: Date.now()
    // });
   PostModel.updateOne({_id: req.params.id}, req.body)
       .then((result) => {
           console.log(result);
           res.sendStatus(200).json({
               message: 'Update Successful',
               post: req.body
           })
       })
});

app.delete('/api/posts/:id', (req, res, next) => {
    PostModel.deleteOne({_id: req.params.id})
        .then((result) => {
            console.log(result);
            res.sendStatus(200).json({
                message: 'Post Deleted'
            });
        });
});


// Export the app to be able to use it with our node server
// including all the middleware we write
module.exports = app;
